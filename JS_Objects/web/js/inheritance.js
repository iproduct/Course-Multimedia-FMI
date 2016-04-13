/* 
 * Crockkford's proposal
 */
//function test() {
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Function.method('inherits', function (parent) {
    this.prototype = new parent();
    var d = {}, 
        p = this.prototype;
    this.prototype.constructor = parent; 
    this.method('uber', function uber(name) {
        if (!(name in d)) {
            d[name] = 0;
        }        
        var f, r, t = d[name], v = parent.prototype;
        if (t) {
            while (t) {
                v = v.constructor.prototype;
                t -= 1;
            }
            f = v[name];
        } else {
            f = p[name];
            if (f == this[name]) {
                f = v[name];
            }
        }
        d[name] += 1;
        r = f.apply(this, Array.prototype.slice.call(arguments, 1));
        d[name] -= 1;
        return r;
    });
    return this;
});

Function.method('swiss', function (parent) {
    for (var i = 1; i < arguments.length; i += 1) {
        var name = arguments[i];
        this.prototype[name] = parent.prototype[name];
    }
    return this;
});

function Parenizor(value) {
    this.setValue(value);
}

Parenizor.method('setValue', function (value) {
    this.value = value;
    return this;
})
.method('getValue', function () {
    return this.value;
})
.method('toString', function () {
    return '(' + this.getValue() + ')';
});

myParenizor = new Parenizor(0);
myString = myParenizor.toString();
console.log(myString);

function ZParenizor(value) {
    this.setValue(value);
}

ZParenizor.inherits(Parenizor);

ZParenizor.method('toString', function () {
    if (this.getValue()) {
        return this.uber('toString');
    }
    return "-0-";
});

myZParenizor = new ZParenizor(0);
myZString = myZParenizor.toString();
console.log(myZString);
