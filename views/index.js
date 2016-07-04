var db = require('../middleware/db');

exports.start_page = function (req, res) {
	res.render('../template/login_page');
	
	var login = req.body.login, //User's login
		pass = req.body.password; //User's password
	
	db.get_user_by_login(login, function (query) {
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
	var login = req.session.login;
	db.get_user_by_login(login, function (query) {
		var user = query.rows;
		res.render('../template/main_page', {login: user[0].login, pass: user[0].pass, userpic: user[0].userpic});
	});
};