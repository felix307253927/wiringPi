/**
 * Created by Administrator on 2017/12/26.
 */

const {
    pinMode, wiringPiSetup, digitalWrite, delay,
    softPwmWrite, softPwmCreate,
    OUTPUT
} = require('wiring-pi')

const PWMA = 1;
const AIN2 = 2;
const AIN1 = 3;
const PWMB = 4;
const BIN2 = 5;
const BIN1 = 6;

const MOTOR = {
    forward: [0, 1, 0, 1],
    back: [1, 0, 1, 0],
    stop: [0, 0, 0, 0],
    left: [1, 0, 0, 1],
    right: [0, 1, 1, 0]
}

function motor(direction, speed) {
    speed = speed === undefined ? 50 : speed;

    digitalWrite(AIN2, direction[0]);
    digitalWrite(AIN1, direction[1]);
    softPwmWrite(PWMA, speed);

    digitalWrite(BIN2, direction[2]);
    digitalWrite(BIN1, direction[3]);
    softPwmWrite(PWMB, speed);
}

function main() {
    wiringPiSetup()
    pinMode(PWMA, OUTPUT)
    pinMode(AIN1, OUTPUT)
    pinMode(AIN2, OUTPUT)
    pinMode(PWMB, OUTPUT)
    pinMode(BIN1, OUTPUT)
    pinMode(BIN2, OUTPUT)

    softPwmCreate(PWMA, 0, 100)
    softPwmCreate(PWMB, 0, 100)


    motor(MOTOR.forward, 50)
    delay(500)
    motor(MOTOR.stop)
    delay(100)
    motor(MOTOR.back, 50)
    delay(1000)
    motor(MOTOR.stop)
}

main()

