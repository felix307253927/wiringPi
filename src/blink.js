/**
 * Created by Administrator on 2017/12/26.
 */

const wpi = require('wiring-pi')

wpi.wiringPiSetupGpio()

let pin = 6

wpi.pinMode(pin, wpi.OUTPUT)


while (1){
    wpi.digitalWrite(6, 1)
    wpi.delay(500)
    wpi.digitalWrite(6, 0)
    wpi.delay(500)
}