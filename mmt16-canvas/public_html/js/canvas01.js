/* 
 * Canvas Demo 01
 */

function init() {
    var c = document.getElementById("canvas01");
    var ctx = c.getContext("2d");
    var gradient = ctx.createLinearGradient(50, 0, 300, 150);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.25, "yellow");
    gradient.addColorStop(0.5, "green");
    gradient.addColorStop(0.75, "blue");
    gradient.addColorStop(1, "violet");
    ctx.fillStyle = gradient;
    ctx.fillRect(50, 50, 300, 150);

    ctx.beginPath();
    var radilaGradient = ctx.createRadialGradient(60,40, 5, 100, 50, 60);
    radilaGradient.addColorStop(0, "yellow");
    radilaGradient.addColorStop(1, "red");

    ctx.fillStyle = radilaGradient;
    ctx.strokeStyle = "#0000FF";
    ctx.lineWidth = 8;
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 15;
    ctx.shadowOffsetY = 10;
    ctx.shadowColor = "black";
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.stroke();
    
    ctx.fillStyle = "red";

    ctx.strokeStyle = radilaGradient;
    ctx.lineWidth = 2;
    ctx.font="35px Arial";
    ctx.fillText("Canvas Demo 01",60,130);
    ctx.strokeText("Canvas Demo 01",60,130);
}

window.addEventListener("load", init, false);
