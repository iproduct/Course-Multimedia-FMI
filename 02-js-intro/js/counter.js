var counter = function countWithClosure(increment) { //IIFE - Module pattern
  var count = 0; //private state
  function privateMethod(){ // private method
    return count += increment;
  }
  return { //public API
    increment: function () {
      return privateMethod();
    },
    decrement: function () {
      return --count;
    }
  };
}(5); //IIFE or Module pattern

console.log(counter.increment());
// console.log(counter.privateMethod())
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.decrement());
console.log(counter.decrement());
console.log(counter.decrement());
console.log(counter.decrement());
       