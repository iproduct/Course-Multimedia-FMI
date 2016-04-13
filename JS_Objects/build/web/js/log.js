/* 
 * Logs results to console if CONOLE is defined or using document.write() if not.
 */


function log() {
    if (!(typeof CONSOLE === 'undefined') && CONSOLE === true) {
        var log_func = console.log;
        log_func.apply(console, arguments);
    } else {
        var resultsDiv = document.getElementById("results");
        Array.prototype.forEach.call(arguments, function(arg) {
            resultsDiv.innerHTML += arg + "<br />";
        });
    }
}