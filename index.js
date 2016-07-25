var express = require('express'),
	app = express(),
	middleware = require('./middleware')(app, express),
    http = require('http').Server(app),
	io = require('socket.io')(http),
	socket = require('./middleware/socket')(io);

//console.log(app.get('port'));

http.listen(app.get('port'), function() {
	console.log("Server has started at port " + app.get('port'));
});