var io;

exports.GetConnection = (number, res) => {
	return io;
}

exports.SetConnection = (number, res) => {
    io = require('socket.io').listen(3000);

	io.sockets.on('connection', function (socket) {
	});

	return io;
}