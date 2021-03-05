'use strict'

var obj1 = {};
var obj2 = Object.create(Object.prototype);
Object.defineProperties(obj2,  {
    prop1: {
        value: 42,
        writable: true
    }, 
    name: {
        value: 'MyName',
        writable: false
    }
})
var obj3 = new Object();

console.log(obj1.toString());
console.log(obj2.toString());
// obj2.name = "new name";
console.log(obj2.name);
console.log(obj2.prop1);
console.log(obj3.toString());