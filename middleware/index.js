var router = require('../route'),
	session = require('express-session'),
	ejs = require('ejs-locals');


module.exports = function (app, express) {
	//Sets global variable 'port'
	app.set('port', 8080); 
	
	//ejs settings
	app.engine('html', ejs);
	app.engine('ejs', ejs);
	app.set('views', 'views');
	app.set('view engine', 'ejs');
	
	//Inicialization directory with constant var
	//app.use('/pubic', express.static(path.join(__dirname, '../public')));
	
	//Cookies settings
	app.use(session({
		secret: 'OLOLO',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false }
	}));
	
	router(app);
};