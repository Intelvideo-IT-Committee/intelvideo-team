exports.sanitize_info = function (text) {
	return text.replace(/'/g, "''");
};

exports.sanitize_text = function (text) {
	text = text.replace(/&/g, "&amp;");
	text = text.replace(/</g, "&lt;");
	text = text.replace(/>/g, "&gt;");
    text = text.replace(/'/g, "''");
	return text;
};

exports.get_time = function () {
	var date = new Date();
	var time = date.getTime();
	time = (time / 1000) | 0;

	var seconds = time % 60;
	time = (time / 60) | 0;
	var minutes = time % 60;
	time = (time / 60) | 0;
    var hours = time % 24;

	var seconds_sym = seconds % 10;
	seconds = (seconds - seconds_sym) / 10;
	var minutes_sym = minutes % 10;
	minutes = (minutes - minutes_sym) / 10;
	var hours_sym = hours % 10;
	hours = (hours - hours_sym) / 10;

	var cur_time = hours + hours_sym + ":" + minutes + minutes_sym + ":" + seconds + seconds_sym;
	return cur_time;
};
