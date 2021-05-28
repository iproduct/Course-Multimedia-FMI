'use strict';

const EventEmitter = require('events');
const process = require('process');

class MyEventEmitter extends EventEmitter {
  constructor() {
    super();
    setImmediate(()=>console.log("Immediate"));
    doFirstJob();
  }
}

let mee = new MyEventEmitter();

function doFirstJob() {
  process.nextTick(() => console.log("First job done!"));
}

mee.on('myEvent', function onMyEvent(val) {
  console.log("Litener 1 - MyEvent received: ", val);
});

mee.on('myEvent', function onMyEvent(val, additionalArg) {
  console.log(`Litener 2 - MyEvent received: ${val}, ${additionalArg}`);
});

mee.emit('myEvent', "Message 1", "Additional Argument");

console.log('end-of-program');