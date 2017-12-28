/**
 * Created by Administrator on 2017/12/28.
 */
const {wiringPiSetup} = require('wiring-pi')
const Motor = require('./motor')
const Servo = require('./servo')


class Car {
    constructor({speed=30}){
        wiringPiSetup();
        this.motor = new Motor(speed)
        this.servo = new Servo()
        this.servo.pwmWrite(0, 90);
        this.servo.pwmWrite(1, 90, 40)
        this.servo.pwmWrite(2, 0, 40)
    }

    motorCmd(cmd, speed){
        this.motor.ctrl(cmd, speed)
    }

    servoCmd(num, deg=0){
        let offset = 25;
        if(num>0){
            offset = 40;
        }
        this.servo.pwmWrite(num, deg, offset);
    }
}