

function foo(x, y) {
    x = x || 42;
    y = y || 0;
    console.log(x, y);
    // for(arg of arguments){
    //     console.log(arg);
    // }

    var args = Array.prototype.slice.bind(arguments)();
    // var args =Array.from(arguments);
    console.log(arguments instanceof Array);
    console.log(args instanceof Array);
    var sum = args.reduce(function(acc, elem){ return acc + elem; });
    console.log(sum);
}

foo(1,2,3,4,5,6,7,8,9)