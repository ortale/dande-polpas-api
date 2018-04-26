var express = require('express');

var databaseConfig = require('../config/database_config');

var orderRepository = require('../repository/order_repository');
var Order = require("../model/order.js");
var polpasOrder = require("../model/polpas_orders.js");
const NotificationsConnetion = require('../config/notifications_connection');

var app = express();

exports.findAll = function retrieveDiscounts(req, res, next) {
	if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] == 'JWT') {
		jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
			if (err) {
				req.user = undefined;
				res.statusCode = 401;
				return res.json({ errors: ['Voce nao tem permissao para acessar esta pagina'] });
			}

			else {
				req.user = decode;

				var sql = 'SELECT * FROM discounts';
				var con = databaseConfig.databaseConnect();
				con.query(sql, function (err, result, fields) {
					if (err) throw err;

					con.end();

					if (!err) {
						res.statusCode = 200;
						return res.json(result);
					}

					else
						return res.json({ errors: ['Error while performing Query.'] });
				});
			}
		})
	}

	else {
		req.user = undefined;
		res.statusCode = 401;
		return res.json({ errors: ['Voce nao tem permissao para acessar esta pagina'] });
	}
};

exports.saveOrder = function save(req, res, next) {
	var order = new Order(req.body);

	var result = saveOrder(order);

	var notificationsConnection = NotificationsConnetion.GetConnection();
	notificationsConnection.emit('CH01', { hello: 'world' });

	return res.json(result);
};

function saveOrder (order) {
	var successOrder = orderRepository.save(order);

	if (!successOrder) {
		var result = {
			"success" : false,
			"message" : "Erro ao efetuar pedido"
		};
		return result;
	}

	var result = {
		"success" : true,
		"message" : "Pedido efetuado com sucesso"
	};
	return result;
}