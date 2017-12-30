/**
 * @author Created by felix on 17-12-27.
 * @email   307253927@qq.com
 */
'use strict';
const http   = require('http')
const {spawn} = require('child_process')
const IO     = require('socket.io');
const Car = require('./car')
const server = http.createServer();

const io = new IO(server);
const car = new Car(30);

io.on('connection', function connection(socket) {
  socket.send('connected!');
  socket.on('message', function (message) {
    console.log('received: %s', message);
  });
  socket.emit('car', {
    speed: car.speed
  })
  socket.on('motor', function (cmd, speed) {
    car.motorCmd(cmd, speed)
    console.log('motor', cmd, speed || 0)
  })
  socket.on('camera', function (cmd) {
    car.cameraCtrl(cmd)
    console.log('camera', cmd)
  })

  socket.on('mjpg', function (cmd) {
    console.log('mjpg', cmd)
    try{
      if(cmd === 'start'){
        spawn('bash', ['../camera.sh'])
        socket.send('mjpg start')
      } else {
        spawn('killall', ['mjpg_streamer'])
        socket.send('mjpg stop')
      }
    } catch(e){console.log(e)}
  })
  
});

process.on('uncaughtException', function() {
  car.motorCmd('stop', 0);
  spawn('killall', ['mjpg_streamer'])
})

process.on('SIGINT', function() {
  car.motorCtrl('stop', 0)
  spawn('killall', ['mjpg_streamer'])
  process.exit(0)
});


server.listen(8087)

console.log('websocket run')

