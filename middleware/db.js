var pg = require('pg'),
	db_url = process.env.DATABASE_URL;

exports.get_user_by_login = function (login, callback) {
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