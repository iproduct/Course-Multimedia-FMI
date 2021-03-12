
var triangle = { a: 1, b: 2, c: 3 };


function ColoredTriangle() {
  this.color = 'red';
}

ColoredTriangle.prototype = triangle;

coloredTriangle = new ColoredTriangle();

// console.log(coloredTriangle.color);

for (var prop in coloredTriangle) {
  if (coloredTriangle.hasOwnProperty(prop)) {
    console.log('coloredTriangle.' + prop + ' = ' + coloredTriangle[prop]);
  }
}
