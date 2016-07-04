var main = require('../views');

var check_cookies = function (req, res, next) {
	if (req.session.login == undefined) {
		res.redirect('/login');
	} else {
		res.redirect('/');
	}
};

module.exports = function (app) {
	app.get('/', check_cookies, main.main_page);
	app.get('/login*', check_cookies,main.start_page);
};