/* 
 * Geolocation and mapping demo.
 */

function init() {
    getLocation();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geolocationDemo01, handleError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function geolocationDemo01(location) {
    var lat = location.coords.latitude;
    var lon = location.coords.longitude;
    var latlon = new google.maps.LatLng(lat, lon);
    var mapProp = {
        center: latlon,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };

    var map = new google.maps.Map(document.getElementById("map01"), mapProp);
    
    //add marker
    var marker=new google.maps.Marker({ position:latlon});
    marker.setMap(map);
}

function handleError(error) {
    var div = document.getElementById("map01");
    switch(error.code) {
        case error.PERMISSION_DENIED:
            div.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            div.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            div.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            div.innerHTML = "An unknown error occurred."
            break;
    }
}




