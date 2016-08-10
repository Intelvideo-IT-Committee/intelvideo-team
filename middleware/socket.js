var utils = require('./utils')
	db = require('./db');

var users = [];

module.exports = function (io) {
	io.on('connection', function(socket) {
		socket.on('new_user_logged_in', function (user) {
			//Adding new user to the list
			users.push(user.login);
			
			//Sending to new user list of the all other users which are online
			socket.emit('send_user_list', users);
			socket.login = user.login;
			
			//Sending to new user list of messages
			db.get_messages(user.id, function(query) {
				var messages = query.rows;
				//console.log(messages);
				socket.emit('new_message_' + user.id, messages);
			});
			
			//Sending for all users login of new user
			socket.broadcast.emit('new_user_joined', user.login);

			console.log(users);
		});
		
		socket.on('new_message', function (data) {
			//Sanitizing from XSS
			var msg = utils.sanitize_message(data.msg),
				author = utils.sanitize_message(data.username),
				id = utils.sanitize_message(data.id);
			
			//Sanitizing from SQLI
			msg = utils.sanitize_user_info(msg);
			author = utils.sanitize_user_info(author);
			id = utils.sanitize_user_info(id);
			/*console.log(msg, ":", author);*/
			
			db.add_message(msg, author, "--:--:--", id, function(query) {});
			
			db.get_messages(id, function(query) {
				var messages = query.rows;
				//Say to all users that there is new message
				socket.broadcast.emit('new_message_' + id, messages);
				socket.emit('new_message_' + id, messages);
			});
		});
		
		socket.on('disconnect', function () {
			//Sending to all login fo disconnected user
			socket.broadcast.emit('delete_user', socket.login);
			
			//Deleting disconnected user from list
			var i = users.indexOf(socket.login);
			//console.log(i);
			users.splice(i, 1);
		});
	})
};