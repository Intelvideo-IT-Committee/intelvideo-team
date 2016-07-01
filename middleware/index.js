module.exports = function (app, express) {
	var router = require('../route');
	
	//Sets global variable 'port'
	app.set('port', 8080); 
	
	router(app);
};