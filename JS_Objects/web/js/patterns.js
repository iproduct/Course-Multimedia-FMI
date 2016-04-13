function test() {
    function Car(model, year, miles){
        this.model = model;
        this.year    = year;
        this.miles  = miles || 5000;
    }
    Car.prototype.toString = function(){
        return this.model + " has done " + this.miles + " miles";
    };
    var civic = new Car("Honda Civic", 2009, 20000);
    var mondeo = new Car("Ford Mondeo", 2010, 5000);
    log(civic.toString());
    log(mondeo.toString());
   
    // Singleton
    var SingletonTester = (function(){
        //args: an object containing arguments for the singleton
        function Singleton(args) {
            //set args variable to args passed or empty object if none provided.
            var args = args || {};
            //set the name parameter
            this.name = 'SingletonTester';
            //set the value of pointX
            this.pointX = args.pointX || 6; //get from arguments or set default
            //set the value of pointY
            this.pointY = args.pointY || 10;  
            this.toString = function() {
                return this.name + 
                "[X: " + this.pointX + ", Y: " + this.pointY + "]";
            }
        }
  
        //this is our instance holder
        var instance;

        //this is an emulation of static variables and methods
        var _static = {
            name: 'SingletonTester',
            //This is a method for getting an instance
            //It returns a singleton instance of a singleton object
            getInstance: function (args){
                if (instance === undefined) {
                    instance = new Singleton(args);
                }
                return instance;
            }
        };
        return _static;
    })();

    var singletonTest = SingletonTester.getInstance({
        pointX: 5
    });
    log(singletonTest.toString()); // outputs 5 
    var singletonTest2 = SingletonTester.getInstance({
        pointY: 12,
        pointX: 18
    });
    singletonTest2.pointY = 25;
    log(singletonTest2.toString());
    log(singletonTest.toString()); 


    //Module
    var testModule = (function(){
        var counter = 0;
        
        var myPrivateMethod = function( foo ) {
            console.log( foo );
        };
        
        return {
            incrementCounter: function() {
                return counter++;
            },
            resetCounter: function() {
                myPrivateMethod('counter value prior to reset:' + counter);
                counter = 0;
            }
        };
    })();

    /*test*/
    log('counter:', testModule.counter);
//    log('myPrivateMethod:', testModule.myPrivateMethod());
    log(testModule.incrementCounter());
    log(testModule.incrementCounter());
    log(testModule.incrementCounter());
    testModule.resetCounter();
    log(testModule.incrementCounter());


    //Mixin
    /* Car Class */
    var Car = function(settings){
        this.model = settings.model || 'no model provided';
        this.colour = settings.colour || 'no colour provided';
    };

    /* Mixin Class */
    var Mixin = function(){};
    Mixin.prototype = {
        driveForward: function(){
            log('drive forward');
        },
        driveBackward: function(){
            log('drive backward');
        }
    };


    /* Augment existing class with a method from another class */
    function augment(receivingClass, givingClass) {
        /* only provide certain methods */
        if (arguments[2]) {
            for (var i=2, len=arguments.length; i<len; i++) {
                receivingClass.prototype[arguments[i]] = 
                        givingClass.prototype[arguments[i]];
            }
        }
        /* provide all methods*/
        else {
            for (var methodName in givingClass.prototype) {
                /* check to make sure the receiving class doesn't 
			   have a method of the same name as the one currently 
			   being processed */
                if (givingClass.prototype.hasOwnProperty(methodName) 
                    && !receivingClass.prototype[methodName]) {
                    receivingClass.prototype[methodName] = 
                            givingClass.prototype[methodName];
                }
            }
        }
    }


    /* Augment the Car class to have the methods 'driveForward' and 'driveBackward'*/
    augment(Car, Mixin);

    /* Create a new Car */
    var vehicle = new Car({
        model:'Ford Escort', 
        colour:'blue'
    });

    /* Test to make sure we now have access to the methods*/
    vehicle.driveForward();
    vehicle.driveBackward();
}


