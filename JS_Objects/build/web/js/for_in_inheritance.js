/* 
 * Classiscal prototype inheritance + for in + hasOwnProperty
 */
function test() {
    
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
    for(prop in civic){
        log(prop, "-->", civic[prop]);
    }
 
    //NewCar inherits Car
    function NewCar(model, year, miles, mpg) {
        Car.call(this, model, year, miles);
        this.mpg = mpg;
    }
    
    extend(NewCar,Car);
    
    log('in NewCar:');
    
    var newCar = new NewCar("Opel", 2014, 10000, 5.5);
    log("newCar.toString():", newCar.toString());
 
    for(var prop in newCar){
        if(newCar.hasOwnProperty(prop)) {
            log(prop, "-->", newCar[prop]);
        }
    }
    
    function extend(Child, Parent) {
        Child.prototype = new Parent;
        Child.prototype.constructor = Child;
        Child.prototype.supper = Parent.prototype;
    }
 }

