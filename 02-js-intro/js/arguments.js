function func1(a1, a2) {
    //console.log(arguments);
    // expected output: 1
  
    //console.log(arguments[1]);
    // expected output: 2
  
    //console.log(arguments[2]);
    // expected output: 3
    
    // let args = Array.prototype.slice.call(arguments, 0);
    console.log(arguments);
    let args2 = Array.from(arguments);
    // let args2 = Array.prototype.slice.call(arguments, 0);
    args2.forEach(a => console.log(a))
  }
  
  func1(1, 2, 3, 4, 5, 6, 7, 8, 9);