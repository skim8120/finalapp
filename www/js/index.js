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

// $(document).ready(function(){
//     var baseURL = "https://soa.smext.faa.gov/asws/";
//         var service = "api/airport/status/";
//         var parameter = "IND"

//         $.get(baseURL + service + parameter, function(result){
//             //do something when success
//             var response = JSON.parse(result);
//             var div = $("#airpot");
//             div.append("<p>airport name=" + response.Name + "</p>");
//             div.append("<p>airport city=" + response.City + "</p>");
//             div.append("<p>airport state=" + response.State + "</p>");
//             div.append("<p>airport status=" + response.Status + "</p>");
//         }, "json");
// });
$.support.cors = true;



var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        var corsServer = "https://cors-anywhere.herokuapp.com/"
        var baseURL = "https://api.darksky.net/forecast/";
        var key = "7eb0473f13748c224c9fd43b3d11bd14/";
        var parameter = "39.1720701,-86.5251022,17";
        var url = baseURL + key + parameter;

    function onSuccess(acceleration) {
        alert('Acceleration X: ' + acceleration.x + '\n' +
              'Acceleration Y: ' + acceleration.y + '\n' +
              'Acceleration Z: ' + acceleration.z + '\n' +
              'Timestamp: '      + acceleration.timestamp + '\n');
    }

    function onError() {
        alert('onError!');
    }

    var options = { frequency: 3000 };  // Update every 3 seconds

    var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);

        console.log(url);
        console.log(navigator.accelerometer);

        $.ajaxPrefilter(function(options) {
            if (options.crossDomain && jQuery.support.cors){
                options.url = corsServer + options.url;
                console.log(options.url);
            }
        });

        $.ajax({
            url: url,
            type: 'GET',
            dataTyps:'json',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            crossDomain:true,
            success: function(result){
                console.log("Success");
                console.log(result);
                // var response = JSON.parse(result);
         //       $("#icon").text(result.currently["icon"]);
                $("#latitude").text(result.latitude);
                $("#longitude").text(result.longitude);
                $("#timezone").text(result.timezone);
                $("#summary").text(result.currently.summary);
                $("#uvIndex").text(result.currently.uvIndex);

            },
            error: function(xhr, status, error){
                console.log("Error");
                console.log(xhr.statusText);
                console.log(xhr.responseText);
                console.log(status);
                console.log(error);
            }


        });


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