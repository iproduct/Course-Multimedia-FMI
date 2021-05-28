const http = require('http');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello from NodeJS!');
});

server.listen(port, hostname, err => {
    if(err) {
        console.log(`Error starting server: ${err}`);
        throw err;
    }
    console.log(`Server running at http://${hostname}:${port}`);
})