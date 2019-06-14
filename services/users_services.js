var express = require('express');
var jwt = require('jsonwebtoken');

var userRepository = require('../repository/user_repository');
var User = require("../model/user.js");

exports.login = function retrieveDiscounts(req, res, next) {
	var user = new User(req.body);

	var success = userRepository.login(user);

	var result = {};

	if (success) {
		var token = jwt.sign({ email: user.user, fullName: user.name, _id: user.id}, 'RESTFULAPIs');
		result = {
			"success" : true,
			"message" : "Login efetuado com sucesso",
			"token"	  : token
		};
		return res.json(result);
	}

	else {
		result = {
			"success" : false,
			"message" : "Usuario ou senha invalido",
			"token"	  : null
		};
		res.statusCode = 401;
		return res.json(result);
	}
};

exports.saveUser = function saveUser(req, res, next) {
	var user = new User(req.body);

	var success = userRepository.save(user);

	var result = {};

	if (!success) {
		result = {
			"success" : false,
			"message" : "Erro ao cadastrar usuario",
			"token"	  : null
		};
		res.statusCode = 500;
		return res.json(result);
	}

	else {
		var token = jwt.sign({ email: user.password, fullName: user.name, _id: user.id}, 'RESTFULAPIs');
		result = {
			"success" : true,
			"message" : "Login efetuado com sucesso",
			"token"	  : token
		};
	}
	return res.json(result);
};

