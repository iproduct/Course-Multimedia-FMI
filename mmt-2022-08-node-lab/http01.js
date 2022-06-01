const http = require('http');
const hostname = 'localhost';
const port = 5000;

const server = http.createServer((req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello from NodeJS, Express, and MongoDB!!!');
});

server.listen(port, hostname, (err)=>{
    if(err) throw err;
    console.log(`HTTP server successfully strted at: http://${hostname}:${port}`);
});