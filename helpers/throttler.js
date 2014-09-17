var config = require('../config/config');

var RateLimiter = require('limiter').RateLimiter;
var limiter = new RateLimiter(
	config.limiter.requests,
	config.limiter.perMilliSec
);

exports.limit = function(req, res, next) {
	limiter.removeTokens(1, function() {
  		next();
	});
};