var express = require('express');
var jwt = require('jsonwebtoken');

var databaseConfig = require('../config/database_config');
var security = require('../config/security');
var Order = require("../model/order.js");
var FormHelper = require("../helper/form_helper.js");
var polpasOrderRepository = require('./polpas_order_repository');

exports.save = function save(orderModel) {
	var order = orderModel;
	//var password = security.testPassword(req.body.password);
	//console.log(password);

	var connection = databaseConfig.databaseConnect();

	var sql = "INSERT INTO orders (user_id, created, modified) VALUES ('" 
	+ orderModel.user_id  + "','"
	+ FormHelper.formatDate(new Date().toString()) + "','" 
	+ FormHelper.formatDate(new Date().toString()) + "')";
	
	return connection.query(sql, function (err, result, fields) {
		if (err) throw err;

		connection.end();
		var polpasOrders = order.polpasOrders;
		return savePolpasOrder(polpasOrders, result.insertId);
	});

	return false;
};

function savePolpasOrder(polpasOrders, idOrder) {
	var successPolpasOrder = false;
	for (var i = 0; i < polpasOrders.length; i++) {
		successPolpasOrder = polpasOrderRepository.save(polpasOrders[i], idOrder);
	}

	return successPolpasOrder;
}