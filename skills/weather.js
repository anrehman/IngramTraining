const request = require('request');

module.exports = function (controller) {

    controller.hears(["weather"], 'direct_message,direct_mention', function (bot, message) {
        console.log(message.text);
        var messageText = message.text.split(" ");
        if(messageText.length > 1) {
            getWeather(message.channel, messageText[1]);
        } else {
            getWeather(message.channel, process.env.CITY);
        }
        
    });

    function getWeather(roomId, city) {
        var weatherAPI = require('../externalapi/weather-api.js');
        weatherAPI.getWeather(city, process.env.APIKEY, function (err, res) {
            if(err) {
                console.log(err);
            }
            console.log(res);
            sendWeatherMessage(roomId, res);
        }); 
        
    }

    function sendWeatherMessage(roomId, data) {
        console.log('sending result');
        let urlRequest = `${process.env.CISCOAPIURL}/messages`;
        request.post(
        {
            headers: {
                'Authorization': 'Bearer ' + process.env.SPARK_TOKEN,
                'Content-Type': 'application/json'
            },
            url: urlRequest, json: {
                roomId: roomId,
                text: 'Hola',
                attachments: getResultCard(data)
            }
        }, (err, res, body) => {
            if (err) { return console.log(err); }
        });
    }

    function processStringDate(seconds, offset) {
        o = Math.abs(offset);
        var timezone = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2)
    }
    function getResultCard(data) {
        // locaton: new Date((data.dt) * 1000).toDateString()
        // date: new Date((data.dt) * 1000).toDateString()
        // temp: ""+ Math.floor(data.main.temp - 273.15)
        // weather icon: http://openweathermap.org/img/wn/" +data.weather[0].icon+ "@2x.png
        // text weather: ""+data.weather[0].main
        // hi temp: "Hi "+ Math.floor(data.main.temp_max - 273.15)
        // Low temp: "Lo "+ Math.floor(data.main.temp_min - 273.15) 
        
        // kelvin scale to celcius
        // return the card
        // TODO create the attachment card
        return "";        
    }
}