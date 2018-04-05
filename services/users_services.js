var express = require('express');
var jwt = require('jsonwebtoken');

var databaseConfig = require('../config/database_config');
var security = require('../config/security');

exports.login = function retrieveDiscounts(req, res, next) {
	var user = req.body.user;
	var password = security.testPassword(req.body.password);
	//console.log(password);

	var password = "$2a$10$16o7BF3B6LKy0BaKOPMLYO5z30yo1JJdHUE6sJwXAEakDE1GYnSVq";

	var connection = databaseConfig.databaseConnect();

	var sql = "SELECT * FROM users WHERE username = '" + user + "' AND password = '" + password + "'";
	connection.query(sql, function (err, result, fields) {
		if (err) throw err;
		connection.end();
        if (!err) {
        	if (result.length > 0) {
        		var token = jwt.sign({ email: user.user, fullName: user.name, _id: user.id}, 'RESTFULAPIs');
        		var success = {
	        		"success" : true,
	        		"message" : "Login efetuado com sucesso",
	        		"token"	  : token
	        	};
	        	return res.json(success);
        	}

        	else {
	        	var success = {
	        		"success" : false,
	        		"message" : "Usuario ou senha invalido",
	        		"token"	  : null
	        	};
	        	res.statusCode = 401;
	        	return res.json(success);
        	}
        }
        else {
        	res.statusCode = 500;
        	return res.json({ errors: ['Error while performing Query.'] });
        }
	});
};

