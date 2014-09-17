var request = require('request').defaults({json: true});
var config = require('../config/config');
var logger = require("../helpers/logger");

exports.getCampaigns = function(req, res) {
	request.get(urlForCampaigns(), function (error, response, body) {
		handleResponse(error, response, body, req, res);
	});
};

exports.postCampaign = function(req, res) {
	request(optionsForPostCampaign(req), function (error, response, body) {
		handleResponse(error, response, body, req, res);
	});
};

function optionsForPostCampaign(req) {
	return {
		method: 'POST',
		url: urlForCampaigns(),
		form: {
			name: req.body.name,
			budget: req.body.budget
		}
	}
};

exports.updateCampaign = function(req, res) {
	request(optionsForUpdateCampaign(req), function (error, response, body) {
		handleResponse(error, response, body, req, res);
	});
};

function optionsForUpdateCampaign(req) {
	var payload = {};

	if(typeof req.body.name != "undefined") {
		payload.name = req.body.name;
	};

	if(typeof req.body.budget != "undefined") {
		payload.budget = req.body.budget;
	};

	return {
		method: 'PUT',
		url: urlForUpdateCampaign(req),
		form: payload
	}
};

function urlForUpdateCampaign(req) {
	return "" + config.facebook.host
	+ "/" + req.params.campaignID
	+ "?&access_token=" + config.facebook.token;
};

exports.deleteCampaign = function(req, res) {
	request.del(urlForDeleteCampaign(req), function (error, response, body) {
		handleResponse(error, response, body, req, res);
	});
};

function urlForDeleteCampaign(req) {
	return "" + config.facebook.host
	+ "/" + req.params.campaignID
	+ "?&access_token=" + config.facebook.token;
};

function handleResponse(error, response, body, req, res) {
	if(error) {
		internalError(error, req, res);
	} else {
		noError(body, req, res);
	}
};

function urlForCampaigns() {
	return "" + config.facebook.host
	+ "/act_" + config.facebook.adAccountID
	+ "/adcampaign_groups"
	+ "?&access_token=" + config.facebook.token;
};

function noError(body, req, res) {
	if(typeof body.error != "undefined") {
		logger(body);
		res.status(409).send(body);
	} else {
		res.send(body);
	}
};

function internalError(error, req, res) {
	logger(error);
	res.status(500).end();
};