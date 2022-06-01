const  createInterface = require('readline/promises').createInterface;

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('What do you think of NodeJS?').then(answer => {
    console.log(`Than you for your feedback: ${answer}`);
    rl.close();
});