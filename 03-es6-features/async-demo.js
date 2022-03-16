async function f() {
  return 1;
}
async function g() {
  throw "Error!!!";
  // return 2;
}

const result = Promise.all([f(), g()])
  .then(
    v => console.log(v),
    err => console.log("Rejected:" + err)
  ); // 1
result.then(v => console.log(v))
.finally(()=>console.log("Finished."));

