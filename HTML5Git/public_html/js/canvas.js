/* 
 * HTML 5 Canvas Demos 
 */
function init() {
    canvasDemo01();
}

function canvasDemo01() {
    var canvas = document.getElementById("canvas01");
    var ctx = canvas.getContext("2d");
    
    // Create gradient
    var grd = ctx.createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, "#F5F5F1");
    grd.addColorStop(1, "#8E8E6E");

    ctx.fillStyle = grd;
    var width=canvas.width;
    var height=canvas.height;
    ctx.fillRect(0, 0, width, height);
}