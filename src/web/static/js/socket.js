(function() {
	var socket = io();
	socket.emit('message', 'hey');
})();