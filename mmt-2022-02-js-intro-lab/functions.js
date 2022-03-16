function Math() {
    this.a = 5;
    this.b = 42;
}

Math.prototype.multiply = function f(k) {
    k = k || 1;
    return k * this.a * this.b;
}

const obj = {a: 10, b: 20} // duck typing
// console.log(obj.multiply(5)) // not working - error multiply not found
// console.log(Math.prototype.multiply.apply(obj, [5]]));
// console.log(Math.prototype.multiply.call(obj, 5));
const multuplyWith5 = Math.prototype.multiply.bind(obj, 5);
console.log( multuplyWith5())