const wpi = require('wiring-pi')
const Hap = require('hap-nodejs')

const Accessory = Hap.Accessory;
const Service = Hap.Service;
const Characteristic = Hap.Characteristic;
const uuid = Hap.uuid;

const {wiringPiSetup, pinMode, digitalWrite, softPwmWrite, softPwmCreate, OUTPUT} = wpi;
const PWMA = 1;
const AIN1 = 2;
const AIN2 = 3;
const PWMB = 4;
const BIN1 = 5;
const BIN2 = 6;

const LightController = {
  name: "小车", //name of accessory
  pincode: "031-45-154",
  username: "FA:3C:ED:5A:1A:10", // MAC like address used by HomeKit to differentiate accessories. 
  manufacturer: "HAP-NodeJS", //manufacturer (optional)
  model: "v1.0", //model (optional)
  serialNumber: "A12S345KGB", //serial number (optional)

  power: false, //curent power status
  rSpeed: 10, 

  outputLogs: true, //output logs

  setPower: function(status) { //set power of accessory
    if(this.outputLogs) console.log("Turning the '%s' %s", this.name, status ? "on" : "off");
    this.power = status;
    wiringPiSetup()
    pinMode(PWMA, OUTPUT)
    pinMode(AIN1, OUTPUT)
    pinMode(AIN2, OUTPUT)
    pinMode(PWMB, OUTPUT)
    pinMode(BIN1, OUTPUT)
    pinMode(BIN2, OUTPUT)
    softPwmCreate(PWMA, 0, 100)
    softPwmCreate(PWMB, 0, 100)

    this.move(status)
  },

  getPower: function() { //get power of accessory
    if(this.outputLogs) console.log("'%s' is %s.", this.name, this.power ? "on" : "off");
    return this.power;
  },

  setSpeed: function(speed) { //set brightness
    if(this.outputLogs) console.log("Setting '%s' brightness to %s", this.name, speed);
    this.rSpeed = speed;
  },

  getSpeed: function() { //get brightness
    if(this.outputLogs) console.log("'%s' brightness is %s", this.name, this.rSpeed);
    return this.rSpeed;
  },
  move(status){
    let v = status?1:0;
    digitalWrite(AIN1, 0);
    digitalWrite(AIN2, v);
    softPwmWrite(PWMA, this.rSpeed);

    digitalWrite(BIN1, 0);
    digitalWrite(BIN2, v);
    softPwmWrite(PWMB, this.rSpeed);
    console.log('---------------------',v, this.rSpeed)
  },

  identify: function() { //identify the accessory
    if(this.outputLogs) console.log("Identify the '%s'", this.name);
  }
}

// Generate a consistent UUID for our light Accessory that will remain the same even when
// restarting our server. We use the `uuid.generate` helper function to create a deterministic
// UUID based on an arbitrary "namespace" and the word "light".
var lightUUID = uuid.generate('hap-nodejs:accessories:light' + LightController.name);

// This is the Accessory that we'll return to HAP-NodeJS that represents our light.
var lightAccessory = exports.accessory = new Accessory(LightController.name, lightUUID);

// Add properties for publishing (in case we're using Core.js and not BridgedCore.js)
lightAccessory.username = LightController.username;
lightAccessory.pincode = LightController.pincode;

// set some basic properties (these values are arbitrary and setting them is optional)
lightAccessory
  .getService(Service.AccessoryInformation)
    .setCharacteristic(Characteristic.Manufacturer, LightController.manufacturer)
    .setCharacteristic(Characteristic.Model, LightController.model)
    .setCharacteristic(Characteristic.SerialNumber, LightController.serialNumber);

// listen for the "identify" event for this Accessory
lightAccessory.on('identify', function(paired, callback) {
  console.log('identify---------------')
  LightController.identify();
  callback();
});

// Add the actual Lightbulb Service and listen for change events from iOS.
// We can see the complete list of Services and Characteristics in `lib/gen/HomeKitTypes.js`
lightAccessory
  .addService(Service.Fan, LightController.name) // services exposed to the user should have "names" like "Light" for this case
  .getCharacteristic(Characteristic.On)
  .on('set', function(value, callback) {
    console.log('call setPower value=', value)
    LightController.setPower(value);

    // Our light is synchronous - this value has been successfully set
    // Invoke the callback when you finished processing the request
    // If it's going to take more than 1s to finish the request, try to invoke the callback
    // after getting the request instead of after finishing it. This avoids blocking other
    // requests from HomeKit.
    callback();
  })
  // We want to intercept requests for our current power state so we can query the hardware itself instead of
  // allowing HAP-NodeJS to return the cached Characteristic.value.
  .on('get', function(callback) {
    callback(null, LightController.getPower());
  });

// To inform HomeKit about changes occurred outside of HomeKit (like user physically turn on the light)
lightAccessory
  .getService(Service.Fan)
  .addCharacteristic(Characteristic.RotationSpeed)
  .on('set', function(value, callback) {
    LightController.setSpeed(value);
    callback();
  })
  .on('get', function(callback) {
    callback(null, LightController.getSpeed());
  });

