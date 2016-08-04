exports.sanitize_user_info = function (text) {
	return text.replace(/'/g, "''");
};	

exports.sanitize_message = function (text) {
	text = text.replace(/&/g, "&amp;");
	text = text.replace(/</g, "&lt;");
	text = text.replace(/>/g, "&gt;");
	return text;
};