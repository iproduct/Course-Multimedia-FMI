function test() {
    var p;
    function Foo(/*Number*/ initValue)
    {
        this.x = initValue || 0;
    }
    Foo.prototype.addX = function(y)    // Define Method
    {
        this.x += y;
    }
            
    function Bar(/*Number*/ initValue, /*Number*/ increment){
        this.supper.constructor.call(this, initValue);
        this.inc = increment;
//        this.newInc = function() {
//            this.x += this.increment;
//        }
    }
    extend(Bar, Foo);
    //            Bar.prototype = new Foo();
    //            Bar.prototype.constructor = Bar;
    //            Bar.prototype.supper = Foo.prototype;
    Bar.prototype.increment = function() {
        this.addX(this.inc);
    }
            
    obj = new Bar(20, 30);
    //obj.AddX(10);
    obj.increment();
    document.getElementById("results").innerHTML = 
        "x = " + obj['x'];
    console.log("x = " + obj['x']);
    
    for(p in obj){
        if(obj.hasOwnProperty(p) && typeof obj[p] !== "function"){
            console.log(p + ": " + obj[p]);
        }
    }

}