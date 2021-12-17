let api ="https://geo.ipify.org/api/v2/country,city?apiKey=at_Dso8uLvMwQs7SxbcA2UMLYfNHDPsm&ipAddress="
let input_ip = document.getElementById("input-ip");
let searrch_btn = document.getElementById("button");
let ip_address_print = document.getElementById("ipAddressPargraph");
let location_print = document.getElementById("LocationPargraph");
let tzone_print = document.getElementById("TimeZonePargraph");
let isp_print = document.getElementById("IspPargraph")
window.addEventListener("load", get_my_information);
searrch_btn.addEventListener("click",get_ip_information);

async function get_my_information()
{
    const response = await fetch(api);
    const data = await response.json();
    console.log(data);
    print(data);
}


async function get_ip_information()
{
    const response = await fetch(api+input_ip.value);
    const data = await response.json();
    console.log(data);
    if(data.code == 422)
    {
        alert("IP Address not found !")
    }
    else
    {
        print(data);
    }
 
}
function print(data)
{
    ip_address_print.innerHTML = data.ip;
    location_print.innerHTML = data.location.city + " , " + data.location.region +"<br>"+ data.location.postalCode;
    tzone_print.innerHTML = "UTC " + data.location.timezone;
    isp_print.innerHTML = data.isp ;
 
}
