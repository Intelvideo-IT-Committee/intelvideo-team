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
	//Writers side
	app.get('/login', check_authorization, main.login_page);
	app.post('/login', main.login_check_page);
	//app.get('/longreads', check_cookies, main.unpublicated_longreads_list);
	app.get('/edit', check_cookies, main.longread_editing);
	//Readers side
	app.get('/', main.longreads_list);

	/*
	app.get('/', check_cookies, main.chaSts_page);

	app.get('/chat/:id/', check_cookies, main.main_page);
	app.post('/add_chat', check_cookies, main.add_chat);

	app.get('/info', check_cookies, main.info_page);
	app.post('/info/change_password', check_cookies, main.change_password_page);
	app.post('/info/change_picture', check_cookies, main.change_user_picture_page);

	app.post('/exit', check_cookies, main.exit);*/
};
