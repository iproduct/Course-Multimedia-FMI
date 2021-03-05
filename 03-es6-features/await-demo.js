async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => reject("Error found."), 2000);
  });

  let result;
  try{
    result = await promise; // <=> promise.then(result => console.log(result); )
    console.log(result);
  } catch(err) {
    result = 'Error processed successfully.';
  }
  return result;
}

(async () => {
  try{
    const result = await f();
    console.log(`Demo finished: ${result}`);
  } catch(err) {
    console.log(`Error: ${err}`);
  }
})() //IIFE

