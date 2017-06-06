var main = require('../views/'),
    admin = require('../views/admin.js');

var check_authorization = function (req, res, next) {
	if (req.session.login == undefined) {
		res.redirect('/admin/login');
	} else {
		next();
	}
};

module.exports = function (app) {
	app.get('/admin/login', admin.login);
	app.post('/admin/login', admin.check_login);
    app.get('/admin/longread', check_authorization, admin.longreads);
	app.get('/admin/longread/edit/:id', check_authorization, admin.edit_longread);
    app.get('/admin/longread/create', check_authorization, admin.create_longread);
    app.post('/admin/longread/save', check_authorization, admin.save_longread);
    app.get('/admin/longread/publish/:id', check_authorization, admin.publicate_longread);

	app.get('/', main.longreads);
    app.get('/longread/:id', main.longread);

	/*
	app.get('/', check_cookies, main.chaSts_page);

	app.get('/chat/:id/', check_cookies, main.main_page);
	app.post('/add_chat', check_cookies, main.add_chat);

	app.get('/info', check_cookies, main.info_page);
	app.post('/info/change_password', check_cookies, main.change_password_page);
	app.post('/info/change_picture', check_cookies, main.change_user_picture_page);

	app.post('/exit', check_cookies, main.exit);*/
};
