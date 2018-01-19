/**
 * Created by Administrator on 2017/12/28.
 */
//树莓派 频率是19.2MHz
//pwmFrequency in  Hz = 19.2e6Hz / pwmClock/ pwmRange;

const {pwmWrite, wiringPiSetup, pinMode, pwmSetMode, pwmSetRange, pwmSetClock,
	PWM_MODE_MS, PWM_OUTPUT,
	//softPwmWrite, softPwmStop,
	//softServoWirte,softServoSetup,
	delay} = require('wiring-pi')

	let argv = process.argv;
	let MAX_PWM = 1024;
	let pin = +argv[2];
	let value = +argv[3];
	value = Math.min(value/90+0.5, 2.5);
	value = parseInt(value * MAX_PWM / 20);

	let fd = wiringPiSetup();
	pinMode(pin, PWM_OUTPUT);
	pwmSetMode(PWM_MODE_MS);
	pwmSetRange(MAX_PWM);
	pwmSetClock(375);//50Hz  =  19.2e6/1024/375
	pwmWrite(pin, value);

	//softServoSetup(0,1,2,3,4,5,6,7);
	//softServoWrite(1, value)

	console.log(fd, pin, value);
	//delay(3000);
	//pwmWrite(pin, 100);
