//
let api ="https://geo.ipify.org/api/v2/country,city?apiKey=at_Dso8uLvMwQs7SxbcA2UMLYfNHDPsm&ipAddress=";
let input_ip = id("input-ip");
let searrch_btn = id("button");
let ip_address_print = id("ipAddressPargraph");
let location_print = id("LocationPargraph");
let tzone_print =id("TimeZonePargraph");
let isp_print = id("IspPargraph");

window.addEventListener("load", get_my_information);
searrch_btn.addEventListener("click",get_ip_information);
input_ip.addEventListener("click",textSelection);

async function get_my_information()
{
    const response = await fetch(api);
    const data = await response.json();
    console.log(data);
    print(data);
    updateMarker([data.location.lat, data.location.lng])
}
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
        updateMarker([data.location.lat, data.location.lng])
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

updateMarker = (update_marker = [-33.665, 18.993]) => {
    map.setView(update_marker, 13);
    L.marker(update_marker).addTo(map);
}