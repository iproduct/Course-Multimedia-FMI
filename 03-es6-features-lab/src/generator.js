const fibonacciLessThan1000 = {
    [Symbol.iterator]: function*(){
        let previous = 0; current = 1;
        for(;;){
            if(current > 1000) break;
            yield current;
            [previous, current] = [current, previous + current];
        }
    }
}

const fibonacci100 = {
    [Symbol.iterator]: function*(){
        let previous = 0; current = 1;
        for(let i = 0; i < 20; i++){
            yield current;
            [previous, current] = [current, previous + current];
        }
    }
}

for(const n of fibonacci100){
    console.log(n)
}

function f({a, b = 0} = {a: "!"}) { return [a, b] } 
console.log([f({a: "ok"}),f(),f({})])
