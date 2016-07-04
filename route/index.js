var main = require('../views');

module.exports = function (app) {
	app.get('/', main.main_page);
	app.get('/login*', main.start_page);
};