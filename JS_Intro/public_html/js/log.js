/* 
 * Logs results to console if CONOLE is defined or using document.write() if not.
 */


function log() {
    console.log.apply(console, arguments);
}