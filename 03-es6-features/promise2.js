function msgAfterTimeout (msg, who, timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(
            () => (Math.random() > 0) ? 
                resolve(`${msg} Hello ${who}!`)
                : reject('Error getting message.'),
            timeout)
    })
}
const result = msgAfterTimeout("", "Foo", 2000)
    .then(msg => {
        console.log(`done after 2000ms:${msg}`);
        return msgAfterTimeout(msg, "Bar", 3000);
    }).then((msg) => {
        console.log(`done after 5000ms:${msg}`)
        throw `ERROR from .then(): to be catched!!!`;
        // return `Final message: ${msg}!!!`;
    }).catch(err => {
        console.log(`IN catch(): ${err}`);
        // return  msgAfterTimeout('', `Final message after Error: ${err}!!!`, 2000);
        throw `Final message after Error: ${err}!!!`;
    }).then(
        msg => {
            console.log(`Finally: ${msg}`);
        }, 
        err => { // second catch
            console.log(`IN second catch(): ${err}`);
        }).finally(()=>{
            console.log('Demo finished.');
        });

console.log(result);