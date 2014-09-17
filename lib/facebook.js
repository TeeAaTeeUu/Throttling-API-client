var request = require('request').defaults({json: true});
var config = require('../config/config');
var logger = require("../helpers/logger");
var Q = require("q");

var RateLimiter = require('limiter').RateLimiter;
var limiter = new RateLimiter(
	config.limiter.requests,
	config.limiter.perMilliSec
	);

exports.endpoint = '';
exports.token = '';

exports.get = function(url) {
	var deferred = Q.defer();
	limiter.removeTokens(1, function() {
		request.get(urlForCampaigns(url), function (error, response, body) {
			handleResponse(error, response, body, deferred);
		});
	});
	return deferred.promise;
};

exports.post = function(url, form) {
	var deferred = Q.defer();
	limiter.removeTokens(1, function() {
		request(optionsForPostCampaign(url, form), function (error, response, body) {
			handleResponse(error, response, body, deferred);
		});
	});
	return deferred.promise;
};

function optionsForPostCampaign(url, form) {
	return {
		method: 'POST',
		url: urlForCampaigns(url),
		form: form
	}
};

exports.put = function(url, form) {
	var deferred = Q.defer();
	limiter.removeTokens(1, function() {
		request(optionsForUpdateCampaign(url, form), function (error, response, body) {
			handleResponse(error, response, body, deferred);
		});
	});
	return deferred.promise;
};

function optionsForUpdateCampaign(url, form) {
	return {
		method: 'PUT',
		url: urlForCampaigns(url),
		form: form
	}
};

exports.delete = function(url) {
	var deferred = Q.defer();
	limiter.removeTokens(1, function() {
		request.del(urlForCampaigns(url), function (error, response, body) {
			handleResponse(error, response, body, deferred);
		});
	});
	return deferred.promise;
};

function handleResponse(error, response, body, deferred) {
	if(error) {
		internalError(error, deferred);
	} else {
		noError(body, deferred);
	}
};

function urlForCampaigns(url) {
	return "" + exports.endpoint + url + "?&access_token=" + exports.token;
};

function noError(body, deferred) {
	if(typeof body.error != "undefined") {
		logger(body);
		deferred.reject(body);
	} else {
		deferred.resolve(body);
	}
};

function internalError(error, deferred) {
	logger(error);
	deferred.reject(error);
};