function getlocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showposition);
    }else{
        console.log("not found the geolaction support")
    }
}

function showposition(position){
    let lat=position.coords.latitude;
    let longi=position.coords.longitude;
    console.log(lat);
    console.log(longi)
}
getlocation();