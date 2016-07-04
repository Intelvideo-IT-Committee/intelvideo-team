var db = require('../middleware/db');
var session = require('express-session');

var check_cookies = function (req, res) {
	if (req.session.login == undefined) {
		res.redirect('/login');
	} else {
		res.redirect('/');
	}
};

exports.start_page = function (req, res) {
	res.render('../template/login_page');
	
	var login = req.body.login, //User's login
		pass = req.body.password; //User's password
	
	db.get_user(login, function (query) {
		var users = query.rows;
		
		//Checking password
		if (users[0].pass == pass) {
			//if pass is right
			req.session.login = login;
		} else {
			//Print alert
		}
	});
	res.redirect('/main');
};

exports.main_page = function (req, res) {
	check_cookies(req, res);
	
	var login = req.session.login;
	db.get_user(login, function (query) {
		var user = query.rows;
		res.render('../template/main_page', {login: user[0].login, pass: user[0].pass, userpic: user[0].userpic});
	});
};