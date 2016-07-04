var router = require('../route');

module.exports = function (app, express) {
	
	//Sets global variable 'port'
	app.set('port', 8080); 
	
	
	
	app.use(session({
		secret: 'OLOLO',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false }
	}));
	
	router(app);
};