/* 
 * HTML 5 Canvas Animation with Sounds
 */

function animate() {
    var dx = 0.3; //px per 100ms
    var dy = 0.3; //px per 100ms
    var dAngle = Math.PI/500; //rad per 100ms
    var sound1 = "audio/sound01.mp3";
    var sound2 = "audio/sound02.mp3";
    var x = 0;
    var y = 0;
    var angle = 0;
    var dx2 = 0.2; //px per 100ms
    var dy2 = 0.2; //px per 100ms
    var dAngle2 = Math.PI/502; //rad per 100ms
    var y2 = 0;
    var angle2 = 0;
    var previous = null;
    var canvas = document.getElementById('canvas');
    if (canvas !== null && canvas.getContext) {
        var ctx = canvas.getContext('2d');
    } else {
        alert("Problem creating canvas 2D drawing context.");
    }
    var x2 = canvas.width;

    var audio = document.createElement("AUDIO");
    audio.src = "audio/sound01.mp3";
    
    function draw(timestamp){
        var progress;
        if (previous === null) previous = timestamp;
        progress = timestamp - previous;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.save();
        x += progress * dx;
        y += progress * dy;
        angle += (progress * dAngle) %  (2 * Math.PI);
        bounceIf(x, y);
        ctx.translate(x , y);
        ctx.rotate(angle);
        ctx.translate(-100, -100);
        ctx.drawImage(img, 0, 0, 200, 200);
        ctx.restore();

//Second image
        ctx.save();
        x2 += progress * dx2;
        y2 += progress * dy2;
        angle2 += (progress * dAngle2) %  (2 * Math.PI);
        bounceIf2(x2, y2);
        ctx.translate(x2 , y2);
        ctx.rotate(angle2);
        ctx.translate(-100, -100);
        ctx.drawImage(img, 0, 0, 200, 200);
        ctx.restore();
        if(window.requestAnimationFrame) {
          window.requestAnimationFrame(draw);
        } else {
            animStep += 3;
            setTimeout(draw, 40);
        }
        previous = timestamp;
    }
    
    //change direction vector
    function bounceIf(x, y) {
        if(y >= canvas.height) {
            dy = -dy;
            audio.src = sound1;
            audio.play();
        }
        if(y < 0) {
            dy = -dy;
            audio.src = sound1;
            audio.play();
        }
        if(x >= canvas.width) {
            dx = -dx;
            audio.src = sound2;
            audio.play();
        }
        if(x < 0) {
            dx = -dx;
            audio.src = sound2;
            audio.play();
       }
    }
    function bounceIf2(x2, y2) {
        if(y2 >= canvas.height) {
            dy2 = -dy2;
            audio.src = sound1;
            audio.play();
        }
        if(y2 < 0) {
            dy2 = -dy2;
            audio.src = sound1;
            audio.play();
        }
        if(x2 >= canvas.width) {
            dx2 = -dx2;
            audio.src = sound2;
            audio.play();
        }
        if(x2 < 0) {
            dx2 = -dx2;
            audio.src = sound2;
            audio.play();
       }
    }
    var animStep = 0;
    var img = new Image();
    img.src = "images/shuriken.svg";
    img.onload = function(){
        if(window.requestAnimationFrame) {
            window.requestAnimationFrame(draw);
        }
    };
}
