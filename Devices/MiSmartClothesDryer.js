require('./Base');

const inherits = require('util').inherits;
const miio = require('miio');

var Accessory, PlatformAccessory, Service, Characteristic, UUIDGen;

MiSmartClothesDryer = function(platform, config) {
    this.init(platform, config);

    Accessory = platform.Accessory;
    PlatformAccessory = platform.PlatformAccessory;
    Service = platform.Service;
    Characteristic = platform.Characteristic;
    UUIDGen = platform.UUIDGen;

    this.device = new miio.Device({
        address: this.config['ip'],
        token: this.config['token']
    });

    this.accessories = {};
    if(this.config['LEDName'] && this.config['LEDName'] != "") {
        this.accessories['switchLEDAccessory'] = new MiSmartClothesDryerSwitchLED(this);
    }
    var accessoriesArr = this.obj2array(this.accessories);

    this.platform.log.debug("[MiSmartClothesDryer][DEBUG]Initializing " + this.config["type"] + " device: " + this.config["ip"] + ", accessories size: " + accessoriesArr.length);

    return accessoriesArr;
}
inherits(MiSmartClothesDryer, Base);

MiSmartClothesDryerSwitchLED = function(dThis) {
    this.device = dThis.device;
    this.name = dThis.config['LEDName'];
    this.platform = dThis.platform;
}

MiSmartClothesDryerSwitchLED.prototype.getServices = function() {
    var services = [];

    var infoService = new Service.AccessoryInformation();
    infoService
        .setCharacteristic(Characteristic.Manufacturer, "XiaoMi")
        .setCharacteristic(Characteristic.Model, "Smart Clothes Dryer")
        .setCharacteristic(Characteristic.SerialNumber, "Undefined");
    services.push(infoService);
    
    var switchLEDService = new Service.Lightbulb(this.name);
    switchLEDService
        .getCharacteristic(Characteristic.On)
        .on('get', this.getLEDPower.bind(this))
        .on('set', this.setLEDPower.bind(this));
    services.push(switchLEDService);

    return services;
}

MiSmartClothesDryerSwitchLED.prototype.getLEDPower = function(callback) {
    var that = this;
    this.device.call("get_prop", ["wifi_led"]).then(result => {
        that.platform.log.debug("[MiOutletPlatform][DEBUG]MiSmartClothesDryer - SwitchLED - getLEDPower: " + result);
        callback(null, result[0] === 'on' ? true : false);
    }).catch(function(err) {
        that.platform.log.error("[MiOutletPlatform][ERROR]MiSmartClothesDryer - SwitchLED - getLEDPower Error: " + err);
        callback(err);
    });
}

MiSmartClothesDryerSwitchLED.prototype.setLEDPower = function(value, callback) {
    var that = this;
    that.device.call("set_wifi_led", [value ? "on" : "off"]).then(result => {
        that.platform.log.debug("[MiOutletPlatform][DEBUG]MiSmartClothesDryer - SwitchLED - setLEDPower Result: " + result);
        if(result[0] === "ok") {
            callback(null);
        } else {
            callback(new Error(result[0]));
        }
    }).catch(function(err) {
        that.platform.log.error("[MiOutletPlatform][ERROR]MiSmartClothesDryer - SwitchLED - setLEDPower Error: " + err);
        callback(err);
    });
}