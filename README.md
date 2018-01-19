### pwm signal(Raspberry Pi 3b  19.2e6Hz)

    pwmFrequency in Hz = 19.2e6 / pwmClock / pwmRange;
    
    servo sg90  pmw T = 20ms;  Freq = 50Hz
    
        0.5ms-------------0deg；
        1.0ms------------45deg；
        1.5ms------------90deg；
        2.0ms-----------135deg；
        2.5ms-----------180deg；
        
        //pin = 1;
        //deg = (int)(value/90 + 0.5) * Freq;
        pwmWrite(pin, deg)


###servo info

----Name----offset----range

    pwm0    25    [0~180]
    pwm1    50    [0~180]
    pwm2    50    [0~120]
