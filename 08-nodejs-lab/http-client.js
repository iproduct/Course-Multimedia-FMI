const http = require('http');
const querystring = require('querystring');

const postData = JSON.stringify({
    message: 'Hi POST'
});

const options = {
    hostname: 'localhost',
    port: 9000,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
}

const req = http.request(options, res => {
    const body = [];
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf-8');
    res.on('data', chunk => {
        body.push(chunk);
    });
    res.on('end', chunk => {
        body.push(chunk);
        console.log(`BODY: ${body.join()}`);
    });
    res.on('error',  err => {
        console.log(`Probelm receiving the response: ${err.message}`);
    });
    
});

req.on('error', err => {
    console.log(`Probelm with request: ${err.message}`);
});

// req.write(postData);
req.end(postData)