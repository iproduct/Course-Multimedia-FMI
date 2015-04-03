/* 
 * CAD System Demo
 */

function init() {
    var canvas = document.getElementById("demo01");
    var context = canvas.getContext("2d");
    context.fillStyle = "#cccccc";
    context.fillRect(0, 0, canvas.width, canvas.height);
    console.log(canvas.width, canvas.height)

    // Test
    var sh1 = new Shape(20, 30, 200, 100, "blue", "orange");
    console.log(sh1.toString());

    //Test inheritance
    var rect1 = new Rectangle(320, 230, 200, 100, "blue", "orange");
    console.log(rect1.toString());
    rect1.draw(context);

    var e1 = new Ellipse(320, 300, 200, 100, "red", "rgba(0, 255, 0, 0.6)");
    console.log(e1.toString());
    e1.draw(context);


}

/* 
 * Shape class
 */
function Shape(x, y, width, height, strokeColor, fillColor) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.strokeColor = strokeColor || 0;
    this.fillColor = fillColor || 0;
}

Shape.prototype.toString = function () {
    return "x=" + this.x + ", y=" + this.y
            + ", width=" + this.width + ", height=" + this.height
            + ", strokeColor=" + this.strokeColor + ", fillColor=" + this.fillColor;
};

Shape.prototype.draw = function (context) {
    context.fillStyle = this.fillColor;
    context.strokeStyle = this.strokeColor;
}

/* 
 * Rectangle class
 */
function Rectangle(x, y, width, height, strokeColor, fillColor) {
    // Shape.call(this, x, y, width, height, strokeColor, fillColor);
    // Shape.apply(this, arguments);
    var constr = Shape.bind(this, x, y, width, height);
    constr(strokeColor, fillColor);
}

function extend(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    Child.prototype.supper = Parent.prototype;
}

extend(Rectangle, Shape);

Rectangle.prototype.draw = function (context) {
    this.supper.draw.call(this, context);
    var halfw = this.width / 2;
    var halfh = this.height / 2;
    context.fillRect(this.x - halfw, this.y - halfh, this.width, this.height);
    context.strokeRect(this.x - halfw, this.y - halfh, this.width, this.height);
};

/* 
 * Ellipse class
 */
function Ellipse(cx, cy, rx, ry, strokeColor, fillColor) {
    Shape.call(this, cx, cy, 2 * rx, 2 * ry, strokeColor, fillColor);
}

extend(Ellipse, Shape);

Ellipse.prototype.draw = function (context) {
    this.supper.draw.call(this, context);
    var k = .5522848,
        w2 = this.width / 2,
        h2 = this.height / 2,
        kx = k * w2,
        ky = k * h2,
        x = this.x;
        y = this.y;
        xb = x - w2,
        yb = y - h2,
        xe = x + w2,
        ye = y + h2;
    context.beginPath();
    context.moveTo(xb, y);
    context.bezierCurveTo(xb, y - ky, x - kx, yb, x, yb);
    context.bezierCurveTo(x + kx, yb, xe, y - ky, xe, y);
    context.bezierCurveTo(xe, y + ky, x + kx, ye, x, ye);
    context.bezierCurveTo(x - kx, ye, xb, y + ky, xb, y);
    context.fill();
    context.stroke();
};

function drawEllipse(ctx, x, y, w, h) {
    var kappa = .5522848,
            rx = (w / 2) * kappa, // control point offset horizontal
            ry = (h / 2) * kappa, // control point offset vertical
            xe = x + w, // x-end
            ye = y + h, // y-end
            xm = x + w / 2, // x-middle
            ym = y + h / 2;       // y-middle

    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

    ctx.stroke();
}
