var pg = require('pg'),
	db_url = 'postgres://obfkgjmcgshcyi:8k89m0xejjPSXxPFFUVpQ70_fg@ec2-54-163-240-101.compute-1.amazonaws.com:5432/d42eqkbg1mn56f';

exports.get_user_by_login = function (login, callback) {
	pg.connect(db_url, function(err, client, done) {
		var handleError = function (err) {
            if(!err) return false;
            done(client);
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('An error occurred');
            return true;
        };
		
		//Choose rows with same login
		var qstring = "SELECT * FROM users WHERE login = '" + login + "'"; 
		var query = client.query(qstring);
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function (result) {
			callback(result);
		});
		done();	
	});
};