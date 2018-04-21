var express = require('express');
var jwt = require('jsonwebtoken');

var databaseConfig = require('../config/database_config');
var security = require('../config/security');
var User = require("../model/user.js");
var FormHelper = require("../helper/form_helper.js");

exports.login = function retrieveDiscounts(req, res, next) {
	var user = new User(req.body);

	/*
	var password = security.testPassword(req.body.password);

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
	*/
};

exports.save = function save(userModel) {
	var user = userModel;
	//var password = security.testPassword(req.body.password);
	//console.log(password);

	var connection = databaseConfig.databaseConnect();

	var sql = "INSERT INTO users (username, password, role, name, active, created, modified) VALUES ('" 
	+ userModel.username + "','" 
	+ userModel.password + "','" 
	+ userModel.role + "','" 
	+ userModel.name 
	+ "','1','" 
	+ FormHelper.formatDate(new Date().toString()) + "','" 
	+ FormHelper.formatDate(new Date().toString()) + "')";
	
	return connection.query(sql, function (err, result, fields) {
		if (err) throw err;
		if (!err) {
			connection.end();
			return true;
		}

		connection.end();
		console.log(result + " " + err);

		return false;
	});
};

