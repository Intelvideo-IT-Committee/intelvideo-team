var db = require('../middleware/db'),
	session = require('express-session'),
	utils = require('../middleware/utils');

exports.longreads = function(req, res) {
    db.getPublicatedLongreads(function (longreads) {
        res.render('../template/main_page', {
            articles: longreads
        });
    });
};

exports.longread = function(req, res) {
    var id = req.params.id;

    db.getLongreadByPublicId(id, function (longread) {
        res.render('../template/longread_page.ejs', {
            article: longread
        });
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
