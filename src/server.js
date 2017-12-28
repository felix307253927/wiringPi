/**
 * @author Created by felix on 17-12-27.
 * @email   307253927@qq.com
 */
'use strict';
const http = require('http')
const IO = require('socket.io');
const Car = require('./car')
const server = http.createServer();

const io = new IO(server);
const car = new Car(30);

io.on('connection', function connection(socket) {
    socket.on('message', function (message) {
        console.log('received: %s', message);
        socket.send('message has received')
    });
    socket.send('something');

    socket.on('motor', function (cmd, speed) {
        car.motorCmd(cmd, speed)
        //   console.log(cmd)
    })
    socket.on('servo', function (num, deg) {
        car.servoCmd(num, deg)
    })

});

server.listen(8086)

console.log('websocket run')

