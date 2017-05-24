var db = require('../middleware/db'),
	session = require('express-session'),
	utils = require('../middleware/utils');

//FIX DISPLAYING IN longreads_edit PAGE

exports.login_page = function (req, res) {
	res.render('../template/login_page', {status: ""});
};

exports.login_check_page = function (req, res) {
	var login = req.body.login, //User's login
		pass = req.body.password; //User's password

	login = utils.sanitize_info(login),
		pass = utils.sanitize_info(pass);

	//console.log(login, ' ', pass);

	db.getUserByLogin(login, function (user) {
		//console.log(user);
		//Checking password
		if (user.length === 0 || user[0].pass != pass) {
			res.render('../template/login_page', {status: "Error - wrong password or login"});
		} else {
			console.log('User with login: ', login, ' logged in');
			req.session.login = login;
			res.redirect('/edit');
		}
	});
};

exports.longread_editing = function(req, res) {
	var id = 0;
	res.render('../template/longread_creation', {id : id});
};

exports.longreads = function(req, res) {
	db.getPublicatedLongreads(function(lrs) {
		var titles = [],
				ids = [],
				authors = [],
				descriptions = [];

			for (var i = 0; i < lrs.length; i += 1) {
				titles.push(lrs[i].title);
				ids.push(lrs[i].id);
				authors.push(lrs[i].author);
				descriptions.push(lrs[i].description);
			};

			res.render('../template/longreads_list', {lr_titles: titles, lr_ids: ids, lr_authors: authors, lr_descriptions: descriptions});
	});
};

/*exports.chats_page = function (req, res) {
	db.get_chats(function (query) {
		var chats = query.rows;
		//console.log(chats);

		var chatnames = [],
			chatids = [];
	 	         for (var i = 0; i < chats.length; i += 1) {
			chatnames.push(chats[i].chatname);
			chatids.push(chats[i].id);
		};
		//console.log(chatids, chatnames);

		res.render('../template/chats_page', {chatnames: chatnames, chatids: chatids});
	});
};

exports.add_chat = function (req, res) {
	var chat_name = req.body.chat_name;
	chat_name = utils.sanitize_message(chat_name);
	chat_name = utils.sanitize_user_info(chat_name);

	db.add_chat(chat_name, function (query) {});
	res.redirect('/');
};

exports.main_page = function (req, res) {
	var login = req.session.login;
	//console.log("Connection with main page by user with login: ", login);
	db.get_user_by_login(login, function (query) {
		var user = query.rows;
		res.render('../template/main_page', {login: user[0].login, id: req.params.id});
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

	db.change_user_info(login, new_pass, "pass", function (query) {
		console.log(login, "has changed his password to", new_pass);
		res.redirect('/info');
	});
};

exports.change_user_picture_page = function (req, res) {
	var login = req.session.login,
		new_pic = req.body.new_pic;

	db.change_user_info(login, new_pic, "userpic", function (query) {
		console.log(login, "has changed his picture to", new_pic);
		res.redirect('/info');
	});
};

exports.exit = function (req, res) {
	req.session.destroy(function(err){

	});
	res.redirect('/login');
};
*/
