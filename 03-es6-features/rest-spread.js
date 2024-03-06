// let a, b, rest;
// [a, b] = [1, 2];
// [a, b] = [b, a]
// console.log(a); // 1
// console.log(b); // 2

// [a, b, , , ...rest] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// function f() {
//     console.log(arguments);
// }
// f(...rest);
// crest = [...rest, 10];
// // crest = rest.slice(0);
// // crest.push(10);
// console.log(a); // 1
// console.log(b); // 2
// console.log(rest); // [3, 4, 5]
// console.log(crest, rest, crest === rest);

// ({a, c} = {a:1, b:2, c:3});
// console.log(a); 
// console.log(c); 

// ES7 - not implemented in Firefox 47a01
({b, a, ...rest} = {a:1, b:2, c:3, d:4});
console.log(a); 
console.log(b); 
console.log(rest); 
// const crest = {...rest, c: 33 };
// console.log(crest); 
const crest = Object.assign({}, {c: 33}, rest);
console.log(crest, rest, crest === rest);


// a = [[1], [2], [3]];
// b = [ ...a, [4]];
// [, c] = a;
// c.shift();

// b.shift().shift();

// console.log('a=', a);
// console.log('b=', b);
// console.log('c=', c);

