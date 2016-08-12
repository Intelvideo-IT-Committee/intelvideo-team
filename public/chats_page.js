var chat_names = [],
	chat_ids = [];

var get_chats = function (names, ids) {
	chat_names = names;
	chat_ids = ids;
	//console.log(chat_names);
};

$(document).ready(function () {
	//console.log("drwaing chat list");
	for (var i = 0; i < chat_names.length; i += 1) {
		//console.log(chat_names[i]);
		var current_chat = "<a href=\"/chat/" + chat_ids[i] + "\"><div class=\"chat\">" + chat_names[i] + "</div></a>";
		//console.log(current_chat);
		$('#chats_list').append(current_chat);
	};
	
	$('.chat').mouseenter(function () {
		$(this).addClass("selected");
	});
	
	$('.chat').mouseleave(function () {
		$(this).removeClass("selected");
	});
	
	$('#dialog_button').click(function () {
		$('#new_dialog').toggleClass('hidden');
	});
});