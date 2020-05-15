const http = require('http');
const fs = require('fs');

const PORT = 9000;

const server = http.createServer((req, res) => {
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile(__dirname + "/page1.html", (err, data) => {
        res.end(data);
    });
    // res.end('<h2>Hello from NodeJS and Typescript!');
});

server.listen(PORT, () => {
    console.log(`HTTP Server listening on port ${PORT}`);
});