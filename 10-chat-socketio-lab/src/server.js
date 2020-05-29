const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

app.use('/', express.static('public'));

io.of('/students').on('connection', (socket) => {
  socket.join('express_room');
  console.log('a user connected: ' + socket.id);
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.of('/students').to('express_room').emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    socket.leave('express_room');
    console.log('user disconnected: ' + socket.id);
  });
});

http.listen(3000, () => {
  console.log('Chat server is listening on localhost:3000 ...');
});