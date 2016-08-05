var main = require('../views');

var check_cookies = function (req, res, next) {
	if (req.session.login == undefined) {
		res.redirect('/login');
	} else {
		next();
	}
};

var check_authorization = function (req, res, next) {
	if (req.session.login != undefined) {
		res.redirect('/');
	} else {
		next();
	}
};


module.exports = function (app) {
	app.get('/', check_cookies, main.chats_page);
	app.get('/chat', check_cookies, main.main_page);
	
	app.get('/login', check_authorization, main.login_page);
	app.post('/login', main.login_check_page);
	
	app.get('/info', check_cookies, main.info_page);
	app.post('/info/change_password', check_cookies, main.change_password_page);
	app.post('/info/change_picture', check_cookies, main.change_user_picture_page);
	
	app.post('/exit', check_cookies, main.exit);
};