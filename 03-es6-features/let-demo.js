
for (let i = 0; i < 5; i++) {
    const callback = function() { console.log(i); }
    setTimeout(callback, i* 1000);
}


for (var i = 0; i < 5; i++) {
    var callback = function (n) { //IIFE
        return function() { console.log(n); }
    }(i);
    setTimeout(callback, i* 1000);
}

// var callbacks = [];
// for (var i = 0; i <= 2; i++) {
//     (function (a) {
//         callbacks[a] = function() { return a * 2; };
//     })(i);
// }

// callbacks.forEach(c => console.log(c()));

