/**
 * @author Created by felix on 17-12-27.
 * @email   307253927@qq.com
 */
'use strict';
const http = require('http')
const IO = require('socket.io');

const server = http.createServer()

const io = new IO(server);

io.on('connection', function connection(socket) {
  socket.on('message', function (message) {
    console.log('received: %s', message);
    socket.send('message has received')
  });
  socket.send('something');
});

server.listen(8086)

console.log('websocket run')

