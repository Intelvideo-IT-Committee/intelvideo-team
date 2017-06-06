var Pool = require('pg').Pool,
	pool = new Pool({
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		ssl: process.env.DB_USE_SSL,
		idleTimeoutMillis: 1000
	});

//
//	FIX ERROR HANDLER IN CALLBACK'S FUNCTIONS
//
//  FIX LONGREAD PUBLICATION (COPY VALUES TO PUBLICATED VERSION)
//

//// Pass request string to the DB
var __runRequest = function(qstring) {
    return new Promise((resolve, reject) => {
        pool.query(qstring, function (err, result) {
		//console.log('db.js:20', result);
        if(err) {
            console.log("DB request:");
            console.log(qstring);
            console.log(JSON.stringify(err));
            reject(err);
        }
            resolve(result.rows);
        });
    });
}

//// Prepare request string
//Longreads
exports.createLongread = (author, date, callback) => {
	var qstring = "INSERT INTO longreads VALUES";
	qstring += " (' ', '" + author + "', '" + date + "', ' ', 'n', DEFAULT, null, ' ')";
	qstring += " RETURNING id;"

	__runRequest(qstring).then((result) => {
		callback(result[0].id);
	}).catch((err) => {
		console.log("DATABASE ERROR : ", err);
		callback(err);
	});
};

exports.saveLongread = (id, title, lead, body, callback) => {
	var qstring = "UPDATE longreads SET title = '" + title + "', body = '" + body +
		"', lead = '" + lead + "' WHERE id = " + id + ";";

	__runRequest(qstring).then(() => {
		callback();
	}).catch((err) => {
		console.log("DATABASE ERROR : ", err);
		callback();
	});
};

exports.getLongread = (id, callback) => {
	var qstring = "SELECT * FROM longreads WHERE id = " + id + ";";

	__runRequest(qstring).then((result) => {
		callback(result[0]);
	}).catch((err) => {
		console.log("DATABASE ERROR : ", err);
		callback(err);
	});
};

//Need to fix
exports.publicateLongread = (id, callback) => {
	 var qstring = "UPDATE longreads SET published = 'y', public_id = (SELECT coalesce(MAX(public_id), 0) + 1 FROM longreads) WHERE id = " + id + ";";

     __runRequest(qstring).then((result) => {
         callback();
     }).catch((err) => {
         console.log("DATABASE ERROR : ", err);
         callback(err);
     })
};

exports.getLongreads = (callback) => {
    var qstring = "SELECT * FROM longreads;";

	__runRequest(qstring).then((result) => {
		callback(result);
	}).catch((err) => {
		console.log("DATABASE ERROR : ", err);
	});
}

exports.getPublicatedLongreads = (callback) => {
	var qstring = "SELECT * FROM longreads WHERE published;";

	__runRequest(qstring).then((result) => {
		callback(result);
	}).catch((err) => {
		console.log("DATABASE ERROR : ", err);
	});
};

//Users
exports.getUserByLogin = (login, callback) => {
	var qstring = "SELECT * FROM users WHERE login = '" + login + "';";

	__runRequest(qstring).then((result) => {
		callback(result);
	}).catch((err) => {
		console.log("DATABASE ERROR : ", err);
		callback(err);
	});
};


// ------------------- Out Of Date ----------------------
/*exports.get_user_by_login = function (login, callback) {
	pg.connect(db_url, function(err, client, done) {
		var handleError = function (err) {
            if(!err) return false;
            done(client);
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('An error occurred');
            return true;
        };

		if(!handleError) {return true;};

		//console.log("lol");

		//Choose rows with same login
		var qstring = "SELECT * FROM users WHERE login = '" + login + "';";
		//console.log(qstring);
		var query = client.query(qstring);
		var cnt = 0;

		query.on('row', function (row, result) {
			result.addRow(row);
			cnt += 1;
		});

		//console.log("Rows count in db answer: ", cnt);

		query.on('end', function (result) {
			callback(result);
		});
		done();
	});
};

exports.change_user_info = function (login, new_user_val, pole, callback) {
	pg.connect(db_url, function(err, client, done) {
		var handleError = function (err) {
            if(!err) return false;
            done(client);
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('An error occurred');
            return true;
        };

		if(!handleError) {return true;};

		//console.log(login);

		//Choose rows with same login
		var qstring = "UPDATE users SET " + pole + " = '" + new_user_val + "' WHERE login = '" + login + "';";
		var query = client.query(qstring);
		var cnt = 0;

		query.on('row', function (row, result) {
			result.addRow(row);
			cnt += 1;
		});

		//console.log("Rows count in db answer: ", cnt);

		query.on('end', function (result) {
			callback(result);
		});
		done();
	});
};


exports.add_message = function (message, author, date, chatid, callback) {
	pg.connect(db_url, function(err, client, done) {
		var handleError = function (err) {
            if(!err) return false;
            done(client);
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('An error occurred');
            return true;
        };

		if(!handleError) {return true;};

		var qstring = "INSERT INTO messages VALUES ('" + author + "', '" + chatid + "', '" + message + "', '" + date + "');";
		var query = client.query(qstring);
		var cnt = 0;

		query.on('row', function (row, result) {
			result.addRow(row);
			cnt += 1;
		});

		query.on('end', function(result) {
			callback(result);
		});
		done();
	});
};

exports.get_messages = function (chatid, callback) {
	pg.connect(db_url, function(err, client, done) {
		var handleError = function (err) {
            if(!err) return false;
            done(client);
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('An error occurred');
            return true;
        };

		if(!handleError) {return true;};

		var qstring = "SELECT * FROM messages WHERE chatid = '" + chatid + "';";
		var query = client.query(qstring);
		var cnt = 0;

		query.on('row', function (row, result) {
			result.addRow(row);
			cnt += 1;
		});

		query.on('end', function(result) {
			callback(result);
		});
		done();
	});
};


exports.add_chat = function (chat_name, callback) {
	pg.connect(db_url, function(err, client, done) {
		var handleError = function (err) {
            if(!err) return false;
            done(client);
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('An error occurred');
            return true;
        };

		if(!handleError) {return true;};

		var qstring = "INSERT INTO chats VALUES ('" + chat_name + "');";
		var query = client.query(qstring);
		var cnt = 0;

		query.on('row', function (row, result) {
			result.addRow(row);
			cnt += 1;
		});

		query.on('end', function(result) {
			callback(result);
		});
		done();
	});
};

exports.get_chats = function (callback) {
	pg.connect(db_url, function(err, client, done) {
		var handleError = function (err) {
            if(!err) return false;
            done(client);
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('An error occurred');
            return true;
        };

		if(!handleError) {return true;};

		var qstring = "SELECT * FROM chats;";
		var query = client.query(qstring);
		var cnt = 0;

		query.on('row', function (row, result) {
			result.addRow(row);
			cnt += 1;
		});

		query.on('end', function(result) {
			callback(result);
		});
		done();
	});
};
*/
