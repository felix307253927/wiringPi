/**
 * Created by Administrator on 2017/12/28.
 */
const {wiringPiSetup} = require('wiring-pi')
const Motor           = require('./motor')
const Servo           = require('./servo')


class Car {
  constructor({speed = 30}) {
    wiringPiSetup();
    this.motor = new Motor(speed);
    this.servo = new Servo();
  }
  
  motorCmd(cmd, speed) {
    this.motor.ctrl(cmd, speed);
  }
  
  cameraCtrl(cmd) {
    this.servo.cameraCtrl(cmd);
  }
}