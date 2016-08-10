var user = '',
	id = '';
var list = [];
var socket = io();

//Function sends message to other users
var send_message = function () {
	var data = $('#message_input').val();
					
	//Sending message to other users
	$('#message_input').val('');
	/*console.log(data, ":", user);*/
	socket.emit('new_message', {
		msg: data,
		username: user, 
		id: id
	});
};
			
//Function draws list of online users
var draw_user_list = function () {
	var list_str = '<p>' + list[0] + '</p>';
	for (var i = 1; i < list.length; i++) {
		list_str += '<p>';
		list_str += list[i];
		list_str += '</p>';
	}
		
	$('#online-users-list').html(list_str);
}

//Getting user's login
var get_user_login = function (data, chat_id) {
	user = data;
	id = chat_id;
	//console.log(user, id);
}

$(document).ready(function() {
	//
	socket.emit('new_user_logged_in', {
		login: user,
		id: id
	});

	//Getting list of all users
	socket.on('send_user_list', function (user_list) {
		console.log(user_list);
		list = (user_list);
		draw_user_list();
	});

	//Тew user logged into the chat
	socket.on('new_user_joined', function (user) {
		list.push(user);
		draw_user_list();
	});

	//Another user exit came out chat
	socket.on('delete_user', function (user) {
		var i = list.indexOf(user);
		list.splice(i, 1);
		draw_user_list();
	});

	//New message arrives
	socket.on('new_message_' + id, function (messages) {
		$('#chat').html("");
		for (var i = 0; i < messages.length; i += 1) {
			console.log(messages[i].msgtime, '-', messages[i].author, ': ', messages[i].msgcontent);
			$('#chat').append("<p>" + messages[i].msgtime + "<b>" + messages[i].author + "</b>: " + messages[i].msgcontent + "</p><br>");
		};
	});
});