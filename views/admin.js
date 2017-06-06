var db = require('../middleware/db'),
	session = require('express-session'),
	utils = require('../middleware/utils');

//   Administation's part

exports.login = function (req, res) {
	res.render('../template/login_page', {status: ""});
};

exports.check_login = function (req, res) {
    var login = req.body.login,
        password = req.body.password;

    login = utils.sanitize_info(login);
    password = utils.sanitize_info(password);

    db.getUserByLogin(login, function (user) {
        if (user.length == 0 || user[0].pass != password) {
            res.render('../template/login_page', {
                status: "error - wrong password or login"
            });
        } else {
            console.log(login, " has logged in");
            req.session.login = login;
            res.redirect('/admin/longread');
        }
    });
};


//   Longread's part

exports.longreads = function (req, res) {
    //res.redirect('/admin/longread/edit/0');

    db.getLongreads(function (longreads) {
        res.render('../template/longreads_list', {
            articles: longreads
        });
    });
};

exports.edit_longread = function (req, res) {
    var id = req.params.id,
        username = req.session.login;

    db.getLongread(id, function (longread) {
        //console.log(longread.body);
        res.render('../template/longread_creation', {
            id: id,
            username: username,
            article: longread
        });
    });
};

exports.save_longread = function (req, res) {
    var id = req.body.id,
        title = req.body.title,
        lead = req.body.lead,
        body = req.body.body;

    //console.log(id, " saved", body);

    db.saveLongread(id, title, lead, body, function () {
        res.send('true');
    });
};

exports.publicate_longread = function (req, res) {
    var id = req.body.id;

    db.publicateLongread(id, function () {
        res.send('true');
    });
}
