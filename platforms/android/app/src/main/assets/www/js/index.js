/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

$.support.cors = true;

var CCOUNT;
$(document).ready(function () {
    $('#btnct').click(function () {

        var hour = $('#hours').val();
        var min = $('#minutes').val();
        var sec = $('#seconds').val();
        var total = parseInt(hour * 60 * 60) + parseInt(min * 60) + parseInt(sec);
        CCOUNT = total;
        cdreset();
    });
});
var t, count;

function cddisplay() {
    document.getElementById('timespan').innerText =  Math.floor((count/60)) + " mins " + (count%60) + " secs";
}

function countdown() {
    // starts countdown
    cddisplay();
    if (count === 0) {
        // time is up

        getWeatherLocation();
        alert("your break starts now")
        cdreset();
        countdown2();
    } else {
        count--;
        document.getElementById('timespan').innerText = Math.floor((count/60)) + " mins " + (count%60) + " secs";

        //document.getElementById('timespan').innerText = count;

        t = setTimeout(countdown, 1000);
    }
}

function cdpause() {
    // pauses countdown
    clearTimeout(t);
}

function cdreset() {
    // resets countdown
    cdpause();
    count = CCOUNT;
    cddisplay();
}



var CCOUNT2;
$(document).ready(function () {
    $('#btnct').click(function () {
        var hour2 = $('#hours2').val();
        var min2 = $('#minutes2').val();
        var sec2 = $('#seconds2').val();
        var total2 = parseInt(hour2 * 60 * 60) + parseInt(min2 * 60) + parseInt(sec2);
        CCOUNT2 = total2;
        cdreset2();
    });
});
var t2, count2;

function cddisplay2() {
    document.getElementById('timespan2').innerText =  Math.floor((count2/60)) + " mins " + (count2%60) + " secs";
}

function countdown2() {
    // starts countdown
    cddisplay2();
    if (count2 === 0) {
        // time is up
        alert("your break is over, go back to working!");
        cdreset2();
        countdown();
    } else {
        count2--;
        document.getElementById('timespan2').innerText = Math.floor((count2/60)) + " mins " + (count2%60) + " secs";

        //document.getElementById('timespan').innerText = count;

        t = setTimeout(countdown2, 1000);
    }
}

function cdpause2() {
    // pauses countdown
    clearTimeout(t2);
}

function cdreset2() {
    // resets countdown
    cdpause2();
    count2 = CCOUNT2;
    cddisplay2();
}

/*** Geolocation ***/
function onGeolocationError(error){
    alert("onGeolocationError");
    alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');

}

function onGeolocationSuccess(position){
    alert("onGeolocationSuccess");
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n'
    );

}
function getWeatherLocation() {

    navigator.geolocation.getCurrentPosition
    (onWeatherSuccess, onWeatherError, { enableHighAccuracy: true });
}

var onWeatherSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;

    getWeather(Latitude, Longitude);
}

// Get weather by using coordinates

function getWeather(latitude, longitude) {

    // Get a free key at http://openweathermap.org/. Replace the "Your_Key_Here" string with that key.
    var OpenWeatherAppKey = "7f3c9328fc8bed6d102307873528d1ca";

    var queryString =
      'http://api.openweathermap.org/data/2.5/weather?lat='
      + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=imperial';

    $.getJSON(queryString, function (results) {

        if (results.weather.length) {

            $.getJSON(queryString, function (results) {

                if (results.weather.length) {
                    alert("Current Weather: " + JSON.stringify(results.weather[0].main) + "\n" + "If the weather is nice, consider going outside");
                    $('#description').text(results.name);
                    var desc = $('#description').text(results.name);

                    $('#temp').text(results.main.temp);
                    $('#wind').text(results.wind.speed);
                    $('#humidity').text(results.main.humidity);
                    $('#visibility').text(results.weather[0].main);

                    var sunriseDate = new Date(results.sys.sunrise);
                    $('#sunrise').text(sunriseDate.toLocaleTimeString());

                    var sunsetDate = new Date(results.sys.sunrise);
                    $('#sunset').text(sunsetDate.toLocaleTimeString());
                }
            });
        }
    }).fail(function () {
        console.log("error getting location");
    });
}

// Error callback

function onWeatherError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');

//        var corsServer = "https://cors-anywhere.herokuapp.com/"
//        var baseURL = "https://api.darksky.net/forecast/";
//        var key = "7eb0473f13748c224c9fd43b3d11bd14/";
//        var parameter = "39.1720701,-86.5251022,17";
//        var url = baseURL + key + parameter;

    function onSuccess(acceleration) {
//        alert('Acceleration X: ' + acceleration.x + '\n' +
//              'Acceleration Y: ' + acceleration.y + '\n' +
//              'Acceleration Z: ' + acceleration.z + '\n' +
//              'Timestamp: '      + acceleration.timestamp + '\n');
              var x = acceleration.x;
              var y = acceleration.y;
              console.log(x + '' + y);
              if (x != 0 || y != 0) {
                alert("movement detected! Resetting timer");
                cdreset();
              }
              //alert(x + " " + y);
    }

    function onError() {
        alert('onError!');
    }

    var options = { frequency: 1000 };  // Update every 3 seconds

    var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        console.log(navigator.accelerometer);
//        console.log(url);

//        $.ajaxPrefilter(function(options) {
//            if (options.crossDomain && jQuery.support.cors){
//                options.url = corsServer + options.url;
//                console.log(options.url);
//            }
//        });

//        $.ajax({
//            url: url,
//            type: 'GET',
//            dataTyps:'json',
//            headers: {'X-Requested-With': 'XMLHttpRequest'},
//            crossDomain:true,
//            success: function(result){
//                console.log("Success");
//                console.log(result);
//                // var response = JSON.parse(result);
//                $("#icon").text(result.currently["icon"]);
//                $("#latitude").text(result.latitude);
//                $("#longitude").text(result.longitude);
//                $("#timezone").text(result.timezone);
//                $("#summary").text(result.currently.time);
//                $("#uvIndex").text(result.currently.uvIndex);
//
//            },
//            error: function(xhr, status, error){
//                console.log("Error");
//                console.log(xhr.statusText);
//                console.log(xhr.responseText);
//                console.log(status);
//                console.log(error);
//            }
//
//
//        });


    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();