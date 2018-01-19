/**
 * Created by Administrator on 2017/12/26.
 */

const wpi = require('wiring-pi')

wpi.wiringPiSetupGpio()

let pin = 6

wpi.pinMode(pin, wpi.OUTPUT)


while (1){
    wpi.digitalWrite(pin, 1)
console.log('HIGHT')
    wpi.delay(1500)
    wpi.digitalWrite(pin, 0)
console.log('LOW')
    wpi.delay(1500)
}

wpi.digitalWrite(pin, 1)
