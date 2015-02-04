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

    var grdBlue = ctx.createLinearGradient(0, 0, 0, 200);
    grdBlue.addColorStop(0, "#AAAAFF");
    grdBlue.addColorStop(1, "#8888FF");

    ctx.fillStyle = grd;
    var width = canvas.width;
    var height = canvas.height;
    ctx.fillRect(0, 0, width, height);

    // Create gradient
    var grd = ctx.createRadialGradient(width/2 - 25, height/2 -20, 3, width/2 - 10, height/2 -20, 80);
    grd.addColorStop(0, "white");
    grd.addColorStop(0.1, "yellow");
    grd.addColorStop(1, "red");

// Fill with gradient
    ctx.arc(width/2, height/2, 50, 0, 2 * Math.PI);
    ctx.fillStyle = grd;
    ctx.fill();
    
    ctx.font = "30px 'Comic Sans MS'";
    ctx.fillStyle = grdBlue;
    ctx.strokeStyle="grey";
    ctx.fillText("Hello Canvas 2D!", 10,50);
    ctx.strokeText("Hello Canvas 2D!",10,50);

}