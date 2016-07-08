var db = require('../middleware/db'),
	session = require('express-session'),
	utils = require('../middleware/utils');

exports.login_page = function (req, res) {
	res.render('../template/login_page', {status: ""});
};

exports.login_check_page = function (req, res) {	
	var login = req.body.login, //User's login
		pass = req.body.password; //User's password
	
	login = utils.sanitize_user_info(login),
		pass = utils.sanitize_user_info(pass);
	
	console.log(login, ' ', pass);
	
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

exports.info_page = function (req, res) {
	var login = req.session.login;
	
	db.get_user_by_login(login, function (query) {
		var user = query.rows;
		res.render('../template/info_page', {pass: user[0].pass, userpic: user[0].userpic});
	});
};

exports.change_password_page = function (req, res) {
	var login = req.session.login, 
		new_pass = req.body.new_pass;
	
	db.change_user_password(login, new_pass, function (query) {
		console.log(login, "has changed his password to", new_pass);
		res.redirect('/info');
	});
};

exports.change_user_picture_page = function (req, res) {
	var login = req.session.login,
		new_pic = req.body.new_pic;
	
	db.change_user_picture(login, new_pic, function (query) {
		console.log(login, "has changed his picture to", new_pic);
		res.redirect('/info');
	});
};

exports.exit = function (req, res) {
	req.session.destroy(function(err){
					
	});
	res.redirect('/login');
};