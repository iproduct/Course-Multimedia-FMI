/* 
 * JS Objects Demo
 */
function init() {
    function Car(model, year, miles) {
        this.model = model;
        this.year = year;
        this.miles = miles || 5000;
//        this.toString = function(){
//            return this.model + " (" + this.year + ") has done " 
//                + this.miles + " miles";
//        };
    }
    
    Car.prototype.toString = function(){
            return this.model + " (" + this.year + ") has done " 
                + this.miles + " miles";
        };


    var civic = new Car("Honda Civic", 2009, 20000);
    var mondeo = new Car("Ford Mondeo", 2010);
    
    log(civic);
    log(mondeo);
    log(civic.toString());
    log(mondeo.toString());

}




