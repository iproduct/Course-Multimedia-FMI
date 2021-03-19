// for(var i = 0; i < 10; i++){
//     setTimeout(function(j){ 
//         console.log(j);
//     }, i * 1000, i);
// }

for(let i = 0; i < 10; i++){
    setTimeout(function(){ 
        console.log(i);
    }, i * 1000);
}