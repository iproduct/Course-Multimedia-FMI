/* 
 * Events introduction
 */

function init() {
    var WIDTH = 900; //Container width
    var HEIGHT = 700; //Container width
    var shipDrag = false;
    var button = document.getElementById("time_button");
//    button.onclick = displayDate;
    button.addEventListener("click", displayDate);
    var ship = document.getElementById("spaceship");
    ship.onmousedown = function (event) {
        shipDrag = true;
        event.preventDefault();
    };
    var container = document.getElementById("container");
    container.onmouseup = function (event) {
        shipDrag = false;
        event.preventDefault();
        event.stopPropagation();
    };

    //Update ship position
    container.addEventListener("mousemove", function (event) {
        document.getElementById("demo").innerHTML = event.which;
        if (shipDrag && event.which > 0) {
            var mouseX = event.clientX;
            var mouseY = event.clientY;

            if (navigator.appName.toLowerCase() === "microsoft internet explorer") {
                // the clientX and clientY properties include 
                // the left and top borders of the client area
                mouseX -= document.documentElement.clientLeft;
                mouseY -= document.documentElement.clientTop;

                var zoomFactor = GetZoomFactor();
                if (zoomFactor !== 1) {  // IE 7 at non-default zoom level
                    mouseX = Math.round(mouseX / zoomFactor);
                    mouseY = Math.round(mouseY / zoomFactor);
                }
            }

            var scrollPos = GetScrollPositions();

            ship.style.left = mouseX + scrollPos.x + "px";
            ship.style.top = mouseY + scrollPos.y + "px";
        }
    }, true);
    event.stopPropagation();
}


function GetZoomFactor() {
    var factor = 1;
    if (document.body.getBoundingClientRect) {
        // rect is only in physical pixel size in IE before version 8 
        var rect = document.body.getBoundingClientRect();
        var physicalW = rect.right - rect.left;
        var logicalW = document.body.offsetWidth;

        // the zoom level is always an integer percent value
        factor = Math.round((physicalW / logicalW) * 100) / 100;
    }
    return factor;
}

function GetScrollPositions() {
    if ('pageXOffset' in window) {  // all browsers, except IE before version 9
        var scrollLeft = window.pageXOffset;
        var scrollTop = window.pageYOffset;
    }
    else {      // Internet Explorer before version 9
        var zoomFactor = GetZoomFactor();
        var scrollLeft = Math.round(document.documentElement.scrollLeft / zoomFactor);
        var scrollTop = Math.round(document.documentElement.scrollTop / zoomFactor);
    }
    return {x: scrollLeft, y: scrollTop};
}

function displayDate() {
    document.getElementById("demo").innerHTML = Date();
}