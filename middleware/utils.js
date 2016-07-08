exports.sanitize_user_info = function (text) {
	return text.replace(/'/g, "''");
};	