//
let api ="https://geo.ipify.org/api/v2/country,city?apiKey=at_PhLz2yhuzpsjlcFOcNX6MEx478Yv2&ipAddress=";
let input_ip = id("input-ip");
let searrch_btn = id("button");
let ip_address_print = id("ipAddressPargraph");
let location_print = id("LocationPargraph");
let tzone_print =id("TimeZonePargraph");
let isp_print = id("IspPargraph");

window.addEventListener("load", get_ip_information);
searrch_btn.addEventListener("click",get_ip_information);
input_ip.addEventListener("click",textSelection);

async function get_ip_information()
{
    const response = await fetch(api+input_ip.value);
    const data = await response.json();
    console.log(data);
    if(data.code == 422)
    {
        alert(input_ip.value + " IP Address not found !");
    }
    else
    {
        print(data);
        displaylocation(data.location.lat, data.location.lng);    }
}

function validate(evt)
{
    let valid = /[0-9.]/;
    var ch = String.fromCharCode(evt.which);
    if(!valid.test(ch))
    {
        evt.preventDefault();
    }
}

function print(data)
{
    ip_address_print.innerHTML = data.ip;
    location_print.innerHTML = data.location.city + " , " + data.location.region +"<br>"+ data.location.postalCode;
    tzone_print.innerHTML = "UTC " + data.location.timezone;
    isp_print.innerHTML = data.isp ;
}

function textSelection() {
    input_ip.select();
  }
 function id(name) {
    return document.getElementById(name);
  }
  
// MAP AREA
const map = L.map('map', {
    'center': [0,0],
    'zoom': 13,
    'layers': [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
          })
    ]
})
// MARKER AREA
const markerIcon = L.icon ({
    iconUrl: "mark-location.svg",
    iconSize: [30, 40]
});

//display location 

function displaylocation(lat, lng){
    map.setView([lat, lng], 13);
    L.marker([lat, lng], {icon: markerIcon}).addTo(map);
}

// enter click 
input_ip.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      searrch_btn.click();
    }
  });





