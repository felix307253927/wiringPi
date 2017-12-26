#include <node.h>
#include <wiringPi.h>
#include <stdio.h>
#include "pca9685.h"
#include "servo.h"

using namespace v8;

void MyPwmWrite(const FunctionCallbackInfo<Value>& args){
    Isolate* isolate = args.GetIsolate();
    if (args.Length() < 2) {
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "参数的数量错误")));
        return;
    }
    if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "参数错误")));
        return;
    }
    myPwmWrite(args[0]->NumberValue(), args[1]->NumberValue(), args[2]->NumberValue());
}

void MyInitPwm(const FunctionCallbackInfo<Value>& args){
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
  NODE_SET_METHOD(exports, "pwmWrite", MyPwmWrite);
  NODE_SET_METHOD(exports, "pwmSetup", MyInitPwm);
  NODE_SET_METHOD(exports, "delay", Delay);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
