var pg = require('pg'),
	db_url = "postgres://obfkgjmcgshcyi:8k89m0xejjPSXxPFFUVpQ70_fg@ec2-54-163-240-101.compute-1.amazonaws.com:5432/d42eqkbg1mn56f?ssl=true";

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
		
		//console.log(login);
		
		//Choose rows with same login
		var qstring = "SELECT * FROM users WHERE login = '" + login + "';"; 
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

exports.change_user_password = function(login, new_user_pass, callback) {
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
		var qstring = "UPDATE users SET pass = '" + new_user_pass + "WHERE login = '" + login + "';"; 
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

exports.change_user_picture = function(login, new_user_pic, callback) {
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
		var qstring = "UPDATE users SET userpic = '" + new_user_pic + "WHERE login = '" + login + "';"; 
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