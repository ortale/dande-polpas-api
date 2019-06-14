var express = require('express');
var jwt = require('jsonwebtoken');

var databaseConfig = require('../config/database_config');
var security = require('../config/security');
var User = require("../model/user.js");
var FormHelper = require("../helper/form_helper.js");

exports.login = function login(userModel) {
	var user = userModel;

	var connection = databaseConfig.databaseConnect();

	var sql = "SELECT * FROM users WHERE username = '" + user.username + "' AND password = '" + user.password + "'";
	
	return connection.query(sql, function (err, result, fields) {
		if (err) throw err;
			
		if (!err) {
			connection.end();
			return result.length > 0;
		}
		
		return false;
	});
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

