var triangle = { a: 1, b: 2, c: 3 };

function ColoredTriangle() {
    this.color = 'red';
}

ColoredTriangle.prototype = triangle;

function test() {
    var obj = new ColoredTriangle();

    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            console.log(`obj.${prop} = ${obj[prop]}`);
        }
    }
}

test()
