//Variable definitions
let api ="https://geo.ipify.org/api/v2/country,city?apiKey=at_0LEnhswBi7WnKxxMMBQfatfzhp4B4&ipAddress=";
let input_ip = id("input-ip");
let searrch_btn = id("button");
let location_back = id("to_location");
let ip_address_print = id("ipAddressPargraph");
let location_print = id("LocationPargraph");
let tzone_print =id("TimeZonePargraph");
let isp_print = id("IspPargraph");
let marker;
//functions call
window.addEventListener("load", get_ip_information);
searrch_btn.addEventListener("click",get_ip_information);
input_ip.addEventListener("click",textSelection);

// GET IP INFORMATION 
async function get_ip_information()
{
    const response = await fetch(api+input_ip.value);
    const data = await response.json();
    
    if(data.code === 422)
    {
        alert(input_ip.value + " IP Address not found !");
    }
    else
    {
        print(data);
        displaylocation(data.location.lat,data.location.lng);  
          
    }
    location_back.addEventListener("click",function ()
    {
        map.flyTo([data.location.lat, data.location.lng], 13);
    });
}
//Prevent the entry of anything that is not allowed 
function validate(evt)
{
    let valid = /[0-9.]/;
    let ch = String.fromCharCode(evt.which);
    if(!valid.test(ch))
    {
        evt.preventDefault();
    }
}
// print location information
function print(data)
{
    ip_address_print.innerHTML = data.ip;
    location_print.innerHTML = data.location.city + " , " + data.location.region +"<br>"+ data.location.postalCode;
    tzone_print.innerHTML = "UTC " + data.location.timezone;
    isp_print.innerHTML = data.isp ;
}
//text select
function textSelection() {
    input_ip.select();
}
//helper function
 function id(name) {
    return document.getElementById(name);
  }


let layer = new L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    noWrap: true,
    minZoom :3,
    maxZoom :18,
});

// varriabels for max map edge

let southWest = L.latLng(-89.98155760646617, -180),
northEast = L.latLng(89.99346179538875, 180);


// MAP AREA
const map = L.map('map', {
    'layers': [layer],    
    // prevent the map out from the world edge
    maxBounds: [[southWest],[northEast]],
    maxBoundsViscosity: 1.5,
});




// MARKER AREA
const markerIcon = L.icon ({
    iconUrl: "mark-location.svg",
    iconSize: [40, 50]
});

//display location 

function displaylocation(lat, lng){
   let city =  location_print.innerHTML.split(',');
    if (marker != null) marker.remove();
    map.setView([lat, lng], 14);
    marker=L.marker([lat, lng], {icon: markerIcon}).addTo(map);
    marker.bindPopup("Here is "+city[0]+" City dude .. !");
    marker.on('click', printIconMsg);
}
// print icon location name on click 
function printIconMsg(e) {
    let popup = e.target.getPopup();
}
// enter click 
input_ip.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
      searrch_btn.click();
    }
  });