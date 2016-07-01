var express = require('express'),
	app = express(),
	middleware = require('./middleware')(app, express),
    http = require('http').Server(app);

console.log(app.get('port'));

http.listen(app.get('port'), function() {
	console.log("Node app is running at port " + app.get('port'));
});