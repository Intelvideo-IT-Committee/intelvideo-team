var users = [];

module.exports = function (io) {
	io.on('connection', function(socket) {
		socket.on('new_user_logged_in', function (login) {
			users.push(login);
			//Sending to new user list of the all other users which are online
			socket.emit('send_user_list', users);
			socket.login = login;
			
			//Sending for all users login of new user
			socket.broadcast.emit('new_user_joined', login);
			
			//Adding new user to the list

			console.log(users);
		});
		
		socket.on('new_message', function (data) {
			//Sending to all users new message
			socket.broadcast.emit('new_message', data);
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