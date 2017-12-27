/**
 * @author Created by felix on 17-12-27.
 * @email   307253927@qq.com
 */
'use strict';
const WebSocket = require('ws')

const ws = new WebSocket.Server({ port: 8080 });

ws.on('connection', function connection(socket) {
  socket.on('message', function (message) {
    console.log('received: %s', message);
  });
  socket.send('something');
});

