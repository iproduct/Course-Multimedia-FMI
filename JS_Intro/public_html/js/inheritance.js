/* 
 * Basic object iheritance demos
 */
function init() {
    function Car(model, year, miles) {

        this.model = model;
        this.year = year;
        this.miles = miles;

    }

    Car.prototype.toString = function () {
        return this.model + " has done " + this.miles + " miles";
    };

    // We can create new instances of the car
    var civic = new Car("Honda Civic", 2009, 20000);
    var mondeo = new Car("Ford Mondeo", 2010, 5000);

    // and then open our browser console to view the
    // output of the toString() method being called on
    // these objects
    console.log(civic.toString());
    console.log(mondeo.toString());
}

var testModule = (function () {
 
  var counter = 0;
 
  return {
 
    incrementCounter: function () {
      return counter++;
    },
 
    resetCounter: function () {
      console.log( "counter value prior to reset: " + counter );
      counter = 0;
    }
  };
 
})();
 
// Usage:
 
// Increment our counter
log(testModule.incrementCounter());
log(testModule.incrementCounter());
log(testModule.incrementCounter());
log(testModule.incrementCounter());
 
// Check the counter value and reset
// Outputs: counter value prior to reset: 1
testModule.resetCounter();

log(testModule.incrementCounter());
log(testModule.incrementCounter());