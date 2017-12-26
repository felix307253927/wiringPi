/**
 * Created by Administrator on 2017/12/26.
 */

const wpi = require('wiring-pi')

wpi.wiringPiSetupGpio()

wpi.pinMode(wpi.OUTPUT)

setTimeout(()=>{
    wpi.digitalWrite(6, 1)
    wpi.delay(500)
    wpi.digitalWrite(6, 0)
}, 500)