#include <node.h>
#include <wiringPi.h>
#include <softPwm.h>
#include <stdio.h>
#include "pca9685.h"
#include "servo.h"

using namespace v8;

bool checkPinValue(const FunctionCallbackInfo<Value>& args){
    if (args.Length() < 2) {
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "参数的数量错误")));
        return false;
    }
    if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "参数错误")));
        return false;
    }
    return true;
}

void WiringPiSetup(const FunctionCallbackInfo<Value>& args){
    Isolate* isolate = args.GetIsolate();
    int fd = wiringPiSetup();
    args.GetReturnValue().Set(Number::New(isolate, fd));
}

void WiringPiSetupGpio(const FunctionCallbackInfo<Value>& args){
    Isolate* isolate = args.GetIsolate();
    int fd = wiringPiSetupGpio();
    args.GetReturnValue().Set(Number::New(isolate, fd));
}

void PinMode(const FunctionCallbackInfo<Value>& args){
    Isolate* isolate = args.GetIsolate();
    if(checkPinValue(args)){
      pinMode(args[0]->NumberValue(), args[1]->NumberValue());
    }
}

void DigitalWrite(const FunctionCallbackInfo<Value>& args){
    Isolate* isolate = args.GetIsolate();
    if(checkPinValue(args)){
      digitalWrite(args[0]->NumberValue(), args[1]->NumberValue());
    }
}


void PwmWrite(const FunctionCallbackInfo<Value>& args){
    Isolate* isolate = args.GetIsolate();
    if(checkPinValue(args)){
      pwmWrite(args[0]->NumberValue(), args[1]->NumberValue());
    }
}

void AnalogWrite(const FunctionCallbackInfo<Value>& args){
    Isolate* isolate = args.GetIsolate();
    if(checkPinValue(args)){
      analogWrite(args[0]->NumberValue(), args[1]->NumberValue());
    }
}

void AnalogRead(const FunctionCallbackInfo<Value>& args){
    Isolate* isolate = args.GetIsolate();
    if (args.Length() < 1 || !args[0]->IsNumber()) {
      isolate->ThrowException(Exception::TypeError(
         String::NewFromUtf8(isolate, "参数错误")));
      return;
    }
    int value = analogRead(args[0]->NumberValue());
    args.GetReturnValue().Set(Number::New(isolate, value));
}

void DigitalRead(const FunctionCallbackInfo<Value>& args){
    Isolate* isolate = args.GetIsolate();
    if (args.Length() < 1 || !args[0]->IsNumber()) {
      isolate->ThrowException(Exception::TypeError(
         String::NewFromUtf8(isolate, "参数错误")));
      return;
    }
    int value = digitalRead(args[0]->NumberValue());
    args.GetReturnValue().Set(Number::New(isolate, value));
}

void PullUpDnControl(const FunctionCallbackInfo<Value>& args){
    Isolate* isolate = args.GetIsolate();
    if(checkPinValue(args)){
      pullUpDnControl(args[0]->NumberValue(), args[1]->NumberValue());
    }
}

void ServoWrite(const FunctionCallbackInfo<Value>& args){
    Isolate* isolate = args.GetIsolate();
    if(checkPinValue(args)){
      myPwmWrite(args[0]->NumberValue(), args[1]->NumberValue(), args[2]->NumberValue());
    }
}

void InitServo(const FunctionCallbackInfo<Value>& args){
    Isolate* isolate = args.GetIsolate();
    int fd = myPwmSetup();
    args.GetReturnValue().Set(Number::New(isolate, fd));
}

void Delay(const FunctionCallbackInfo<Value>& args){
    Isolate* isolate = args.GetIsolate();
    if (args.Length() < 1 || !args[0]->IsNumber()) {
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "参数错误")));
        return;
    }
    delay(args[0]->NumberValue());
}


void Init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "wiringPiSetup", WiringPiSetup);
  NODE_SET_METHOD(exports, "wiringPiSetup", WiringPiSetupGpio);
  NODE_SET_METHOD(exports, "pinMode", PinMode);
  NODE_SET_METHOD(exports, "pinMode", PinMode);
  NODE_SET_METHOD(exports, "pullUpDnControl", PullUpDnControl);
  NODE_SET_METHOD(exports, "digitalWrite", DigitalWrite);
  NODE_SET_METHOD(exports, "pwmWrite", PwmWrite);
  NODE_SET_METHOD(exports, "digitalRead", DigitalRead);
  NODE_SET_METHOD(exports, "analogRead", AnalogRead);
  NODE_SET_METHOD(exports, "analogWrite", AnalogWrite);
  NODE_SET_METHOD(exports, "delay", Delay);

  NODE_SET_METHOD(exports, "servoWrite", ServoWrite);
  NODE_SET_METHOD(exports, "initServo", InitServo);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
