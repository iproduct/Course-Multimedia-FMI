const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 9000;

const server = http.createServer((req, res) => {
    const path = url.parse(req.url).pathname;
    console.log(path);
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile(__dirname + "/page1.html", (err, data) => {
            res.end(data);
        });
    } else if (req.method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', chunk => {
            body.push(chunk);
            console.log(body.concat().toString());
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({'echo-reponse': body.concat().toString()}));
        });
        
    } else {
        res.writeHead(405, { 'Content-Type': 'text/html' });
        res.end('Method Not Allowed');
    }
});

server.listen(PORT, () => {
    console.log(`HTTP Server listening on port ${PORT}`);
});