
function findIndexFrom(a, predicate, start) {
    return a.findIndex((elem, index) => index > start && predicate(elem))
}

var a = [23, 42, 34, 67, 23, 49, 12, 62, 77];
var i = -1;
do {
    i = findIndexFrom(a, (elem, index) => elem %7 === 0, i+1)
    if(i> 0) console.log(i);
}while (i > 0)

console.log(a.filter((elem, index) => elem %7 === 0))
console.log(
    a.map((elem, index) => [elem, index]).filter(([elem, index]) => elem % 7 === 0)
    .map(([elem, index]) => index)
);