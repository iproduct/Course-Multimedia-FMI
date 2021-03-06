/**
 * Htttp server demo - demonstrates url, request and response handling
 */

const http = require('http');
const URL = require('url').URL;

const posts = [];
let nextId = 0;

const port = 3000;
const hostname = 'localhost';
const server = http.createServer((request, response) => {
    // request is an http.IncomingMessage, which is a Readable Stream
    // response is an http.ServerResponse, which is a Writable Stream

    // Request url handling - parse to extract the required resource name ***
    var pathname = new URL(request.url, `http://${hostname}:${port}`).pathname;
    console.log("\nRequest for " + pathname + " received.");
    console.log(`Request method: ${request.method}`);
    console.log(`Headers ${JSON.stringify(request.headers)}`);

    if (request.method === 'GET') {
        if (pathname.substr(1) === 'api/posts') {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(posts));
        } else {
            // 404: File not found
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end(`
             <html>
                 <body>
                     <h1>Error Status 404: Resource "${pathname}" does not exist.</h1>
                 </body>
             </html>
             `);
        }
    } else if (request.method === 'POST') {
        if (pathname.substr(1) === 'api/posts') {
            var body = [];
            request.on('data', function (chunk) {
                body.push(chunk);
            }).on('end', function () {
                body = Buffer.concat(body).toString();
                const newPost = JSON.parse(body);
                newPost.id = ++nextId;
                console.log(newPost);
                posts.push(newPost);

                // Retun response - 201 : Created
                response.writeHead(201, {
                    'content-type': 'application/json',
                    'location': `http://localhost:${port}/api/posts/${newPost.id}`
                });
                response.write(JSON.stringify(newPost));
                response.end();
            }).on('error', (err) => {
                // This prints the error message and stack trace to `stderr`.
                console.error(err.stack);
                response.writeHead(400, {
                    'content-type': 'application/json',
                });
                response.end('{"error": "unable to read the request body"}');
            });
        } else {
            // 404: File not found
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end(`
             <html>
                 <body>
                     <h1>Error Status 404: Resource "${pathname}" does not exist.</h1>
                 </body>
             </html>
             `);
        }
    }
});

// Start listening for reuests 
server.listen(port, hostname, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Server error handling
server.on('error', (e) => {
    console.log(`Got error: ${e.message}`);
});
