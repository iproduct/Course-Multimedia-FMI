
function init() {
    "use strict";
    var x =1;
    eval ("x = 2");
    alert (x);
    // create a new object whose prototype is a new, empty object
// and a adding single property 'p', with value 42
    var o = Object.create({}, {p: {writable: true, enumerable: true, configurable: true, value: 42}});

// by default properties ARE NOT writable, enumerable or configurable:
    o.p = 24;
    o.p;
// 42

    o.q = 12;
    for (var prop in o) {
        console.log(prop + " = " + o[prop]);
    }
// 'q'

    delete o.p;
// false

}

