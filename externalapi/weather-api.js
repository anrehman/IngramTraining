var request = require("request");
var env = require('node-env-file');
env('./.env');


module.exports.getWeather = function (city, apiKey, callback) {
    var options = {
        method: 'GET',
        url: process.env.APIURL + `/weather?q=${city}&appid=${apiKey}`
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log("Error in getReplys" + error);
            callback(new Error("Could not retreive, sorry [API not responding]"), null);
            return;
        }

        if ((response < 200) || (response > 299)) {
            console.log("Error in getReplys" + error);
            callback(new Error("Could not retreive, sorry [API not responding]"), null);
            return;
        }

        var data = JSON.parse(body);
        callback(null, data);
    });
};