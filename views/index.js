var db = require('../middleware/db'),
	session = require('express-session');

exports.login_page = function (req, res) {
	res.render('../template/login_page');
};

exports.login_check_page = function (req, res) {	
	var login = req.body.login, //User's login
		pass = req.body.password; //User's password
	
	console.log(login, ' ', pass);
	
	db.get_user_by_login(login, function (query) {
		var user = query.rows;
		console.log(user);
		//Checking password
		if (user[0].pass == pass) {
			console.log('right pass')
			//if pass is right
			req.session.login = login;
			res.redirect('/');
		} else {
			//If password is not correct
			res.redirect('/login');
		}
	});
};

exports.main_page = function (req, res) {	
	var login = req.session.login;
	console.log("Connection with main page by user with login: ", login);
	db.get_user_by_login(login, function (query) {
		var user = query.rows;
		res.render('../template/main_page', {login: user[0].login, pass: user[0].pass, userpic: user[0].userpic});
	});
};