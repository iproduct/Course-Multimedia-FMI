class Fibonacci {
  constructor(number){
    this.number = number;
  }

  *[Symbol.iterator]() {
      var pre = 0, cur = 1, index = 0;
      for (;;) {
        [pre, cur] = [cur, pre + cur];
        index++;
        if(index > this.number) break;
        yield cur;
      }
    }
  }
  
  const fib10 = new Fibonacci(20);
  console.log(fib10);
  for (var n of fib10) {
    console.log(n);
  }