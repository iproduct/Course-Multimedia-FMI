function init() {
    var count = (function() {
        var counterValue = 0;
        return function() {
            return counterValue ++;
        }
    }());
    console.log(count());
    console.log(count());
    console.log(count());
}

