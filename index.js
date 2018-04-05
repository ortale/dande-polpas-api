var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// services requirements
var discounts = require('./services/discounts_services');
var establishment_types = require('./services/establishment_types');
var users = require('./services/users_services');

// call bindings functions
bindHTTPConnection();
bindRoutes();

// bindings
function bindRoutes() {
	app.get('/discounts', discounts.findAll, function (req, res, next) {
		console.log(req.body);
		res.json(req.body);
	});

	app.get('/establishment_types', establishment_types.findAll, function (req, res, next) {
		console.log(req.body);
		res.json(req.body);
	});

	app.post('/login', users.login, function (req, res) {
		console.log(req.body);
		res.json(req.body);
	});

	app.use(function(req, res, next) {
		var typeis = require('type-is');
		var http = require('http'); 

		console.log(req.headers['user-agent']);
		if (req.accepts('application/json') != 'application/json') {
			console.log("html");
		}

		else {
			console.log("json");
		}

		res.status(404).send('404 page');
	});
}

function bindHTTPConnection() {
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json({ type: 'application/json' }));

	app.listen(8080, function() {
		console.log('Example app listening on port 8080!');
	});
}

module.exports = app;