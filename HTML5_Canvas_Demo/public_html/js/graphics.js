/* 
 * Canvas graphics demos
 */

function init() {
    var canvasId = "canvas01";
    var canvas = document.getElementById(canvasId);

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = "yellow";
        ctx.fillRect(30,30, 300, 150);
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.fillRect (0, 0, 200, 100);
    } else {
        console.log("Canvas with id = '" + canvasId + "' not available.")
    }
}
