/* 
 * HTML 5 Geolocation and Mapping Demo
 */

function loadMap() {
    var script = document.createElement("script");
    script.src = "http://maps.googleapis.com/maps/api/js?callback=init";
    document.body.appendChild(script);
}

window.onload = loadMap;
var map;
function init() {
    var prop = {
        center: new google.maps.LatLng(42.674428899999995, 23.3303442),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    map = new google.maps.Map(document.getElementById("map"), prop);
}
function locate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("demo").innerHTML =
                "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var myPoint = new google.maps.LatLng(
            position.coords.latitude, position.coords.longitude);
    var marker = new google.maps.Marker({
        position: myPoint,
    });

    marker.setMap(map);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

