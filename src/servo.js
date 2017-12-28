/**
 * Created by Administrator on 2017/12/28.
 */
const {
    wiringPiSetup, pwmWrite, delay, OUTPUT, pca9685Setup,
    wiringPiI2CWriteReg16
} = require('wiring-pi')

const HZ = 60;
const MAX_PWM = 4096
const PIN_BASE= 300
const LEDALL_ON_L = 0x6

function calcTicks( impulseMs, hertz) {
    let cycleMs = 1000 / hertz;
    return parseInt(MAX_PWM * impulseMs / cycleMs);
}


class Servo {
    constructor(){
        wiringPiSetup()
        this.init()
    }

    init(){
        let fd = pca9685Setup(PIN_BASE, 0x40, HZ);
        console.log(fd)
        wiringPiI2CWriteReg16(fd, LEDALL_ON_L, 0x0);
        wiringPiI2CWriteReg16(fd, LEDALL_ON_L+2, 0x1000);
    }

    pwmWrite(num, x, offset){
        let y, tick;
        y=x/90.0+0.5;
        y=Math.max(y,0.5);
        y=Math.min(y,2.5);
        tick = calcTicks(y, HZ) + offset;
        pwmWrite(PIN_BASE+num, tick);
    }
}

module.exports = Servo

let srv = new Servo()

srv.pwmWrite(0, 180, 25)
delay(500)
srv.pwmWrite(1, 0, 40)
srv.pwmWrite(2, 90, 40)
console.log(123)
