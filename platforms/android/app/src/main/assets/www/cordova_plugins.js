cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-device-motion.Acceleration",
      "file": "plugins/cordova-plugin-device-motion/www/Acceleration.js",
      "pluginId": "cordova-plugin-device-motion",
      "clobbers": [
        "Acceleration"
      ]
    },
    {
      "id": "cordova-plugin-device-motion.accelerometer",
      "file": "plugins/cordova-plugin-device-motion/www/accelerometer.js",
      "pluginId": "cordova-plugin-device-motion",
      "clobbers": [
        "navigator.accelerometer"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.geolocation",
      "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "navigator.geolocation"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.PositionError",
      "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
      "pluginId": "cordova-plugin-geolocation",
      "runs": true
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-device-motion": "2.0.1",
    "cordova-plugin-geolocation": "4.0.2"
  };
});