const EventEmitter = require('events').EventEmitter;
const rx = require('rxjs');

const myEventEmitter = new EventEmitter();


// first listener
const listener1 = (data) => console.log(`Listener 1 called:`, data)

// second listener
const listener2 = (data) => console.log(`Listener 2 called:`, data)

myEventEmitter.on('myevent', listener1);
// myEventEmitter.once('myevent', listener2);
setTimeout(() => myEventEmitter.addListener('myevent', listener2), 2050);

rx.interval(1000).pipe(
    rx.take(5)
).forEach(event => {
    myEventEmitter.emit('myevent', "MyEvent " + event);
});
