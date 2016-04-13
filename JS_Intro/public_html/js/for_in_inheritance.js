/* 
 * Classiscal prototype inheritance + for in + hasOwnProperty
 */
function init() {
    
    function Car(model, year, miles){
        this.model = model;
        this.year    = year;
        this.miles  = miles || 5000;
//        this.toString = function(){
//            return this.model + " has done " + this.miles + " miles";
//        };
    }
    Car.prototype.toString = function(){
        return this.model + " has done " + this.miles + " miles";
    };
    var civic = new Car("Honda Civic", 2009, 20000);
    var mondeo = new Car("Ford Mondeo", 2010, 5000);

    log(civic.toString());
    log(mondeo.toString());
    
    var keys = Object.keys(civic);
    for(i in keys){
//        if(civic.hasOwnProperty(prop)) {
            log(keys[i], "-->", civic[keys[i]]);
//        }
    }
    
    log("\nPreferred way:");
    Object.keys(civic).forEach(function(key){
        log(key, "-->", civic[key]);
    });
    
    //NewCar inherits Car
    log('\nIn NewCar:');
    function NewCar(model, year, miles, mpg) {
        Car.call(this, model, year, miles);
        this.mpg = mpg;
    }
    
    extend(NewCar,Car);
    
    NewCar.prototype.toString = function(){
        return this.supper.toString() + " / mpg: " + this.mpg;
    };
    
    var newCar = new NewCar("Opel", 2014, 10000, 5.5);
    log("newCar.toString():", newCar.toString());
 
    for(var prop in newCar){
        if(newCar.hasOwnProperty(prop)) {
            log(prop, "-->", newCar[prop]);
        }
    }
    
    function extend(Child, Parent) {
        Child.prototype = new Parent; //Object.create(Parent.prototype)
        Child.prototype.constructor = Child;
        //Object.getPrototypeOf(Child.prototype) OR 
        // Child.prototype.__proto__
        Child.prototype.supper = Parent.prototype; 
    }
 }

