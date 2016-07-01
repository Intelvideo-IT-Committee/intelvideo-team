var main = require('../views');

module.exports = function (app) {
	app.get('/*', main.startPage)
};