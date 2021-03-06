require('./Devices/MiSmartClothesDryer');

var fs = require('fs');
var packageFile = require("./package.json");
var PlatformAccessory, Accessory, Service, Characteristic, UUIDGen;

module.exports = function(homebridge) {
    if(!isConfig(homebridge.user.configPath(), "platforms", "MiSmartClothesDryerPlatform")) {
        return;
    }

    PlatformAccessory = homebridge.platformAccessory;
    Accessory = homebridge.hap.Accessory;
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    UUIDGen = homebridge.hap.uuid;

    homebridge.registerPlatform('homebridge-mi-smartclothesdryer', 'MiSmartClothesDryerPlatform', MiSmartClothesDryerPlatform, true);
}

function isConfig(configFile, type, name) {
    var config = JSON.parse(fs.readFileSync(configFile));
    if("accessories" === type) {
        var accessories = config.accessories;
        for(var i in accessories) {
            if(accessories[i]['accessory'] === name) {
                return true;
            }
        }
    } else if("platforms" === type) {
        var platforms = config.platforms;
        for(var i in platforms) {
            if(platforms[i]['platform'] === name) {
                return true;
            }
        }
    } else {
    }

    return false;
}

function MiSmartClothesDryerPlatform(log, config, api) {
    if(null == config) {
        return;
    }

    this.Accessory = Accessory;
    this.PlatformAccessory = PlatformAccessory;
    this.Service = Service;
    this.Characteristic = Characteristic;
    this.UUIDGen = UUIDGen;

    this.log = log;
    this.config = config;

    if (api) {
        this.api = api;
    }

    this.log.info("[MiSmartClothesDryerPlatform][INFO]***********************************************************************");
    this.log.info("[MiSmartClothesDryerPlatform][INFO]          MiSmartClothesDryerPlatform v%s By Maxwell Li", packageFile.version);
    this.log.info("[MiSmartClothesDryerPlatform][INFO]  GitHub: https://github.com/iyuenan3/homebridge-mi-smartclothesdryer");
    this.log.info("[MiSmartClothesDryerPlatform][INFO]***********************************************************************");
    this.log.info("[MiSmartClothesDryerPlatform][INFO]start success...");
}

MiSmartClothesDryerPlatform.prototype = {
    accessories: function(callback) {
        var myAccessories = [];

        var deviceCfgs = this.config['deviceCfgs'];

        if(deviceCfgs instanceof Array) {
            for (var i = 0; i < deviceCfgs.length; i++) {
                var deviceCfg = deviceCfgs[i];
                if(null == deviceCfg['type'] || "" == deviceCfg['type'] || null == deviceCfg['token'] || "" == deviceCfg['token'] || null == deviceCfg['ip'] || "" == deviceCfg['ip']) {
                    continue;
                }

                if (deviceCfg['type'] == "MiSmartClothesDryer") {
                    new MiSmartClothesDryer(this, deviceCfg).forEach(function(accessory, index, arr){
                        myAccessories.push(accessory);
                    });
                } else {
                }
            }
            this.log.info("[MiSmartClothesDryer][INFO]device size: " + deviceCfgs.length + ", accessories size: " + myAccessories.length);
        }

        callback(myAccessories);
    }
}