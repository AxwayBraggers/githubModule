var request = require('request');

var notifyServer = function(data, err) {
    console.log(data.data);
    request({
        url: data.url,
        method: "POST",
        body: data,
        json: true
    }, err);
}


module.exports.notifyServer = notifyServer;