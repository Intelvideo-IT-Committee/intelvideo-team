var utils = require('./utils')
	db = require('./db');

var users = [];

module.exports = function (io) {
	io.on('connection', function(socket) {
		socket.on('new_user_logged_in', function (login) {
			users.push(login);
			//Sending to new user list of the all other users which are online
			socket.emit('send_user_list', users);
			socket.login = login;
			
			//Sending to new user list of messages
			db.get_messages("0", function(query) {
				var messages = query.rows;
				socket.emit('new_message', messages);
			});
			
			//Sending for all users login of new user
			socket.broadcast.emit('new_user_joined', login);
			
			//Adding new user to the list

			console.log(users);
		});
		
		socket.on('new_message', function (data) {
			//Sanitizing from XSS
			var msg = utils.sanitize_user_info(data.msg);
			var author = utils.sanitize_user_info(data.username);
			
			//Sanitizing from SQLI
			msg = utils.sanitize_user_info(msg);
			author = utils.sanitize_user_info(author);
			/*console.log(msg, ":", author);*/
			
			db.add_message(msg, author, "--:--:--", "0", function(query) {});
			
			db.get_messages("0", function(query) {
				var messages = query.rows;
				//Say to all users that there is new message
				socket.broadcast.emit('new_message', messages);
			});
		});
		
		socket.on('disconnect', function () {
			//Sending to all login fo disconnected user
			socket.broadcast.emit('delete_user', socket.login);
			//Deleting disconnected user from list
			var i = users.indexOf(socket.login);
			console.log(i);
			users.splice(i, 1);
		});
	})
};