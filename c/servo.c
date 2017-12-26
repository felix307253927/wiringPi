#include "pca9685.h"
#include <wiringPi.h>
#include <stdio.h>
#include <stdlib.h>

#define PIN_BASE 300
#define MAX_PWM 4096
#define HERTZ 50
#define max(x,y) ((x)>(y)? (x):(y))
#define min(x,y) ((x)<(y)? (x):(y))

/**
 * Calculate the number of ticks the signal should be high for the required amount of time
 */
int calcTicks(float impulseMs, int hertz)
{
	float cycleMs = 1000.0f / hertz;
	return (int)(MAX_PWM * impulseMs / cycleMs + 0.5f);
}

void myPwmWrite(int servonum, float x)
{
  float y;
  int tick;
  y=x/90.0+0.5;
  y=max(y,0.5);
  y=min(y,2.5);
  tick = calcTicks(y, HERTZ);
  printf("myPwmWrite----\n");
  pwmWrite(PIN_BASE+servonum,tick);
}

int myPwmSetup(void){
    printf("initPwm---> 300\n");
    int fd = pca9685Setup(PIN_BASE, 0x40, HERTZ);
    if(fd<0){
        return fd;
    }
    pca9685PWMReset(fd);
    return fd;
}

