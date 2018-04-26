var express = require('express');
var jwt = require('jsonwebtoken');

var databaseConfig = require('../config/database_config');
var PolpasOrder = require("../model/polpas_orders.js");
var FormHelper = require("../helper/form_helper.js");

exports.save = function save(polpasOrderModel, idOrder) {
	var polpasOrder = polpasOrderModel;
	//var password = security.testPassword(req.body.password);
	//console.log(password);

	var connection = databaseConfig.databaseConnect();

	var sql = "INSERT INTO polpas_orders (quantity, polpa_id, order_id, created, modified) VALUES ('" 
	+ polpasOrder.quantity + "','" 
	+ polpasOrder.polpa_id + "','" 
	+ idOrder + "','" 
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

