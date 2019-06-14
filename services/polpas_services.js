var express = require('express');
var jwt = require('jsonwebtoken');

var databaseConfig = require('../config/database_config');

var orderRepository = require('../repository/order_repository');
var Order = require("../model/order.js");
var polpasOrder = require("../model/polpas_orders.js");
const NotificationsConnetion = require('../config/notifications_connection');

var app = express();

exports.getAll = function retrieveDiscounts(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] == 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) {
        req.user = undefined;
        res.statusCode = 401;
        return res.json({ errors: ['Voce nao tem permissao para acessar esta pagina'] });
      }

      else {
        req.user = decode;

        var sql = 'SELECT * FROM polpas';
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