const fibonacciLessThan1000 = {
    [Symbol.iterator](){
        let previous = 0; current = 1;
        return {
            next() {
                [previous, current] = [current, previous + current];
                return {done: current > 1000, value: current};
            }
        }
    }
}

for(const n of fibonacciLessThan1000){
    console.log(n)
}
