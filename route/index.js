var main = require('../views');

var check_cookies = function (req, res, next) {
	if (req.session.login == undefined) {
		res.redirect('/login');
	} else {
		next();
	}
};

module.exports = function (app) {
	app.get('/', check_cookies, main.main_page);
	app.get('/login', main.login_page);
	app.post('/login', main.login_check_page)
};