const {pwmSetup, pwmWrite, delay} = require('./build/Release/hello.node');



function main() {
    let fd = pwmSetup();
    if(fd<0){
        return console.log('error  fd:', fd);
    }
    let deg = 0, step = 1, flag = true;
    while (1) {
        if(flag){
            if((deg+=step)>=180){
                flag = false;
                delay(200);
            }
        } else {
            if((deg-=step)<=0){
                flag = true;
                delay(200);
            }
        }
        myPwmWrite(0, deg);
        console.log('deg->', deg);
        pwmWrite(0, deg);
        delay(2000);
    }
}

main();


