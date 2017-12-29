/**
 * Created by Administrator on 2017/12/28.
 */
const {
        pwmWrite, pca9685Setup,
        wiringPiI2CWriteReg16
      } = require('wiring-pi')

const HZ          = 60;
const MAX_PWM     = 4096
const PIN_BASE    = 300
const LEDALL_ON_L = 0x6
const MIN         = 0;
const MAX         = 180;

const SERVO0 = 0, SERVO1 = 1, SERVO2 = 2;

function calcTicks(impulseMs, hertz) {
  let cycleMs = 1000 / hertz;
  return parseInt(MAX_PWM * impulseMs / cycleMs);
}

function addDeg(deg, step = 1) {
  deg += step
  return deg < MAX ? deg : MAX
}

function subDeg(deg, step = 1) {
  deg -= step
  return deg > MIN ? deg : MIN
}

class Servo {
  constructor() {
    this.servo0 = 90; //初始化摄像头左右舵机
    this.servo1 = 90; //初始化摄像头左右舵机
    this.servo2 = 0;  //初始化摄像头上下舵机
    this.step   = 0.5;
    this.init()
    this.pwmWrite(SERVO0, this.servo0);
    this.pwmWrite(SERVO1, this.servo1, 40)
    this.pwmWrite(SERVO2, this.servo2, 40)
  }
  
  init() {
    let fd = pca9685Setup(PIN_BASE, 0x40, HZ);
    console.log(fd)
    wiringPiI2CWriteReg16(fd, LEDALL_ON_L, 0x0);
    wiringPiI2CWriteReg16(fd, LEDALL_ON_L + 2, 0x1000);
  }
  
  pwmWrite(num, deg, offset = 25) {
    let y, tick;
    y    = deg / 90.0 + 0.5;
    y    = Math.max(y, 0.5);
    y    = Math.min(y, 2.5);
    tick = calcTicks(y, HZ) + offset;
    pwmWrite(PIN_BASE + num, tick);
  }
  
  cameraCtrl(cmd) {
    switch (cmd) {
      case 'U':
        this.pwmWrite(SERVO2, this.servo2 = addDeg(this.servo2, this.step));
        break;
      case 'D':
        this.pwmWrite(SERVO2, this.servo2 = subDeg(this.servo2, this.step));
        break;
      case 'L':
        this.pwmWrite(SERVO1, this.servo1 = addDeg(this.servo1, this.step));
        break;
      case 'R':
        this.pwmWrite(SERVO1, this.servo1 = subDeg(this.servo1, this.step));
        break;
      case 'stop':
      default:
        break;
    }
  }
}

module.exports = Servo

/*let srv = new Servo()

srv.pwmWrite(0, 180, 25)
delay(500)
srv.pwmWrite(1, 0, 40)
srv.pwmWrite(2, 90, 40)
console.log(123)*/
