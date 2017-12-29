/**
 * Created by Administrator on 2017/12/28.
 */
const {
  pwmWrite, pca9685Setup,
  wiringPiI2CWriteReg16
} = require('wiring-pi')

const HZ = 60;
const MAX_PWM = 4096
const PIN_BASE = 300
const LEDALL_ON_L = 0x6
const MIN = 0;
const MAX = 180;
const SERVO0 = 0;
const SERVO1 = 1;
const SERVO2 = 2;

const OF0 = 25;
const OF1 = 40;

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
    this.servo0 = 90; //初始化超声波左右舵机
    this.servo1 = 90; //初始化摄像头左右舵机
    this.servo2 = 0;  //初始化摄像头上下舵机
    this.step = 5;
    this.stop = true;
    this.cmd = 'stop';
    this.init()
    this.pwmWrite(SERVO0, this.servo0, OF0);
    this.pwmWrite(SERVO1, this.servo1, OF1)
    this.pwmWrite(SERVO2, this.servo2, OF1)
    this.run();
  }

  init() {
    let fd = pca9685Setup(PIN_BASE, 0x40, HZ);
    console.log(fd)
    wiringPiI2CWriteReg16(fd, LEDALL_ON_L, 0x0);
    wiringPiI2CWriteReg16(fd, LEDALL_ON_L + 2, 0x1000);
  }

  run() {
    setInterval(() => {
      if (!this.stop) {
        switch (this.cmd) {
          case 'U':
            this.pwmWrite(SERVO2, (this.servo2 = addDeg(this.servo2, this.step)), OF1);
            break;
          case 'D':
            this.pwmWrite(SERVO2, (this.servo2 = subDeg(this.servo2, this.step)), OF1);
            break;
          case 'L':
            this.pwmWrite(SERVO1, (this.servo1 = addDeg(this.servo1, this.step)), OF1);
            break;
          case 'R':
            this.pwmWrite(SERVO1, (this.servo1 = subDeg(this.servo1, this.step)), OF1);
            break;
          case 'stop':
          default:
            this.stop = true;
            break;
        }
      }
    }, 50)
  }

  pwmWrite(num, deg, offset = OF0) {
    let y, tick;
    y = deg / 90.0 + 0.5;
    y = Math.max(y, 0.5);
    y = Math.min(y, 2.5);
    tick = calcTicks(y, HZ) + offset;
    pwmWrite(PIN_BASE + num, tick);
  }

  cameraCtrl(cmd) {
    this.cmd = cmd;
    this.stop = false;
  }
}

module.exports = Servo

/*let srv = new Servo()

 srv.pwmWrite(0, 180, 25)
 delay(500)
 srv.pwmWrite(1, 0, 40)
 srv.pwmWrite(2, 90, 40)
 console.log(123)*/
