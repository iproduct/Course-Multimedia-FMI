/* 
 * JS Module Demo
 */
function init() {
    
    // Counter module
    var testModule = (function () {

        var counter = 0;

        return {
            incrementCounter: function () {
                return counter++;
            },
            resetCounter: function () {
                console.log("counter value prior to reset: " + counter);
                counter = 0;
            }
        };

    })();

// Usage:

// Increment our counter
    log(testModule.incrementCounter());
    log(testModule.incrementCounter());
    log(testModule.incrementCounter());

// Check the counter value and reset
// Outputs: counter value prior to reset: 1
    testModule.resetCounter();
    log(testModule.incrementCounter());
}