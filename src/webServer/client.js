import config from '../../config.json';
import uuid from 'node-uuid';
import cookie from 'cookie';

var _log = function(id, text) {
	// All extra arguments passed to this function are treated as part of `text`, a la console.log
	if (arguments.length > this.length) {
		text = text + ' ' + Array.prototype.slice.call(arguments).splice(this.length, arguments.length).join(' ');
	}
	var date = new Date();
	var timestamp = date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ':' + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds() + '.' + Math.round(date.getMilliseconds() / 10);
	var trimmedId = id.substr(0, 8);
	console.log('[' + timestamp + ']', '{' +  trimmedId + '..}', text);
};

function initialize(socket) {
	var parsedCookies = cookie.parse(socket.handshake.headers.cookie);
	socket.id = uuid.v4();
	socket.sessionId = parsedCookies[config.webServer.session.cookieName];
	socket.log = _log.bind(_log, socket.id);
	socket.log('Connected.');
}

module.exports = function(socket) {
	initialize(socket);

	socket.on('message', function(data) {
		socket.log('Message:',  data);
	});

	socket.on('error', function(data) {
		socket.log('Error:', data);
	});
};