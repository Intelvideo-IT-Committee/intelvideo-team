var db = require('../middleware/db'),
	session = require('express-session');

exports.login_page = function (req, res) {
	res.render('../template/login_page', {status: ""});
};

exports.login_check_page = function (req, res) {	
	var login = req.body.login, //User's login
		pass = req.body.password; //User's password
	
	//console.log(login, ' ', pass);
	
	db.get_user_by_login(login, function (query) {
		var user = query.rows;
		//console.log(user);
		//Checking password
		if (user.length === 0 || user[0].pass != pass) {
			res.render('../template/login_page', {status: "Error - wrong password or login"})
		} else {
			console.log('User with login: ', login, ' logged in')
			req.session.login = login;
			res.redirect('/');
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