var fs = require("fs");
var config = require('../config/config');

module.exports = function (data) {
	fs.appendFileSync(
		config.errorLog,
		new Date().toUTCString()
		+ " -- "
		+ JSON.stringify(data) + "\n"
	);
};