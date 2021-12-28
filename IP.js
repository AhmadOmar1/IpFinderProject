//Variable definitions
let api ="https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_CGoWEsQyq34npeVDfYZfbImoWpT3n&ipAddress=";
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
    let lat = data.location.lat;
    let lng = data.location.lng;
    if(data.code == 422)
    {
        alert(input_ip.value + " IP Address not found !");
    }
    else
    {
        print(data);
        displaylocation(lat,lng);    
    }
    location_back.addEventListener("click",function ()
    {
        map.flyTo([lat, lng], 13);
    });

}
//Prevent the entry of anything that is not allowed 
function validate(evt)
{
    let valid = /[0-9.]/;
    var ch = String.fromCharCode(evt.which);
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
  
  var layer = new L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    noWrap: true,
    minZoom :4,
    maxZoom :18,

});
// MAP AREA
const map = L.map('map', {
    'center': [0,0],
    'zoom': 13,
    'layers': [layer
    ]
})
// MARKER AREA
const markerIcon = L.icon ({
    iconUrl: "mark-location.svg",
    iconSize: [40, 50]
});

//display location 

function displaylocation(lat, lng){
   
    if (marker != null) marker.remove();
    map.setView([lat, lng], 13);
    marker=L.marker([lat, lng], {icon: markerIcon}).addTo(map);
    marker.bindPopup("You are in "+location_print.innerHTML+" dude .. !");
    marker.on('click', printIconMsg);
}

// enter click 
input_ip.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      searrch_btn.click();
    }
  });


 function printIconMsg(e) {
     var popup = e.target.getPopup();
     var content = popup.getContent();
  
     console.log(content);
 }