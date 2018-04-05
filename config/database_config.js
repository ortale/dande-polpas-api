var mysql = require('mysql');

var config = {};

config.database = {};

config.database.host = "localhost";
config.database.user = "root";
config.database.password = "";
config.database.dbname = "db_larica_do_dia";

var con = {};

exports.databaseConnect = function () {
	con = mysql.createConnection({
		host: config.database.host,
		user: config.database.user,
		password: config.database.password,
		database: config.database.dbname
	});

	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
	});

	return con;
};