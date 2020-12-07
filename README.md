# homebridge-mi-smartclothesdryer

MIJIA Smart Clothes Dryer plugins for HomeBridge.   
   
Thanks for [nfarina](https://github.com/nfarina)(the author of [homebridge](https://github.com/nfarina/homebridge)), [OpenMiHome](https://github.com/OpenMiHome/mihome-binary-protocol), [aholstenson](https://github.com/aholstenson)(the author of [miio](https://github.com/aholstenson/miio)), [Mr.Yin](https://github.com/YinHangCode)(the author of some xiaomi plugins), all other developer and testers.   
   
**Note: I have only a part of these devices, so some devices don't have tested. If you find bugs, please submit them to [issues](https://github.com/iyuenan3/homebridge-mi-smartclothesdryer/issues).**   

![MiSmartClothesDryer](https://raw.githubusercontent.com/iyuenan3/homebridge-mi-smartclothesdryer/main/images/SmartClothesDryer.jpg)

## Supported Devices
1. MiSmartClothesDryer(米家智能晾衣机)   

## Installation
1. Install HomeBridge, please follow it's [README](https://github.com/nfarina/homebridge/blob/master/README.md).   
If you are using Raspberry Pi, please read [Running-HomeBridge-on-a-Raspberry-Pi](https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi).   
2. Make sure you can see HomeBridge in your iOS devices, if not, please go back to step 1.   
3. Install packages.   
```
npm install -g homebridge-mi-smartclothesdryer
```
## Configuration
```
"platforms": [{
    "platform": "MiSmartClothesDryerPlatform",
    "deviceCfgs": [{
        "type": "MiSmartClothesDryer",
        "ip": "192.168.88.xx",
        "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        "LEDName": "living room led light"
    }]
}]
```
## Get token
### Get token by miio2.db (Recommend)
setup MiJia(MiHome) app in your android device or android virtual machine.   
open MiJia(MiHome) app and login your account.   
refresh device list and make sure device display in the device list.   
get miio2.db(path: /data/data/com.xiaomi.smarthome/databases/miio2.db) file from your android device or android virtual machine.   
open website [[Get MiIo Tokens By DataBase File](http://miio2.yinhh.com/)], upload miio2.db file and submit.    
### Get token by network
Open command prompt or terminal. Run following command:
```
miio --discover
```
Wait until you get output similar to this:
```
Device ID: xxxxxxxx   
Model info: Unknown   
Address: 192.168.88.xx   
Token: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx via auto-token   
Support: Unknown   
```
"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" is token.   
If token is "???", then reset device and connect device created Wi-Fi hotspot.   
Run following command:   
```
miio --discover --sync
```
Wait until you get output.   
For more information about token, please refer to [OpenMiHome](https://github.com/OpenMiHome/mihome-binary-protocol) and [miio](https://github.com/aholstenson/miio).   

## Version Logs
