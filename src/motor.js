/**
 * Created by Administrator on 2017/12/26.
 */

const {
    pinMode, wiringPiSetup, digitalWrite, delay,
    softPwmWrite, softPwmCreate, OUTPUT
} = require('wiring-pi')

const PWMA = 1; //左侧车轮
const AIN2 = 2;
const AIN1 = 3;
const PWMB = 4; //右侧车轮
const BIN2 = 5;
const BIN1 = 6;

class Motor {
    constructor(speed = 30) {
        this.speed = speed;
        this.init()
    }

    init() {
        wiringPiSetup()
        pinMode(PWMA, OUTPUT)
        pinMode(AIN1, OUTPUT)
        pinMode(AIN2, OUTPUT)
        pinMode(PWMB, OUTPUT)
        pinMode(BIN1, OUTPUT)
        pinMode(BIN2, OUTPUT)

        softPwmCreate(PWMA, 0, 100)
        softPwmCreate(PWMB, 0, 100)
    }

    move(direction, Aspeed = this.speed, Bspeed = this.speed) {
        digitalWrite(AIN2, direction[0]);
        digitalWrite(AIN1, direction[1]);
        softPwmWrite(PWMA, Aspeed);

        digitalWrite(BIN2, direction[2]);
        digitalWrite(BIN1, direction[3]);
        softPwmWrite(PWMB, Bspeed);
    }

    ctrl(cmd) {
        switch (cmd) {
            case 'F':
                this.move([0, 1, 0, 1]);
                break;
            case 'B':
                this.move([1, 0, 1, 0]);
                break;
            case 'L':
                this.move([1, 0, 0, 1]);
                break;
            case'R':
                this.move([0, 1, 1, 0]);
                break;
            case 'FL':
                this.move([0, 1, 0, 1], this.speed / 2, this.speed);
                break;
            case 'FR':
                this.move([0, 1, 0, 1], this.speed, this.speed / 2);
                break;
            case 'BL':
                this.move([1, 0, 1, 0], this.speed / 2, this.speed);
                break;
            case 'BR':
                this.move([1, 0, 1, 0], this.speed, this.speed / 2);
                break;
            default:
                this.move([0, 0, 0, 0], 0, 0)
        }
    }
}



