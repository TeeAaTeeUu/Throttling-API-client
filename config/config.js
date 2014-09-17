var env = process.env.NODE_ENV || 'development';

var config = {
	development: {
		facebook: {
			host: 'https://graph.facebook.com',
			token: 'abcdfiruweferug',
			adAccountID: 'testing'
		},
		errorLog: 'request_log.txt',
		limiter: {
			requests: 600,
			perMilliSec: 600 * 1000
		}
	}
};

module.exports = config[env];