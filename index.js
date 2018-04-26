var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// services requirements
var users = require('./services/users_services');
var orders = require('./services/orders_services');
const NotificationsConnetion = require('./config/notifications_connection');

// call bindings functions
bindHTTPConnection();
bindNotifications();
bindRoutes();
var mSocket;

// bindings
function bindRoutes() {
	/*
	app.get('/discounts', discounts.findAll, function (req, res, next) {
		console.log(req.body);
		res.json(req.body);
	});

	app.get('/establishment_types', establishment_types.findAll, function (req, res, next) {
		console.log(req.body);
		res.json(req.body);
	});

	app.post('/user/login', users.login, function (req, res) {
		console.log(req.body);
		res.json(req.body);
	});
	*/

	app.post('/user/saveUser', users.saveUser, function (req, res) {
		console.log(req.body);
		res.json(req.body);
	});

	app.post('/order/save', orders.saveOrder, function (req, res) {
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
	var cors = require('cors')

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json({ type: 'application/json' }));

	app.listen(8000, function() {
		console.log('Example app listening on port 8080!');
	});
	app.use(cors({credentials: true, origin: true}));
}

function bindNotifications() {
	NotificationsConnetion.SetConnection();
}

module.exports = app;