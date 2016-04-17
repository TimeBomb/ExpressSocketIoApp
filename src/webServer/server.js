import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import routes from './routes.js';
import config from '../../config.json';
import client from './client.js';
import session from 'express-session';
import sqlite from 'connect-sqlite3';

var expressServer = express();
var sqliteStore = sqlite(session);
var socketIoServer;

function start() {
	var httpServer = http.Server(expressServer);
	socketIoServer = socketIo(httpServer);

	try {
		socketIoServer.on('connection', client);
	} catch (exception) {
		console.warn('Web Socket through exception:', exception);
	}

	expressServer.use(session({
		store: new sqliteStore(),
		secret: config.webServer.session.secret,
		name: config.webServer.session.cookieName
	}));
	expressServer.use(express.static(__dirname + '/../web/static'));
	routes.initialize(expressServer);

	httpServer.listen(config.webServer.port, function() {
		console.log('Web Server now listening on port', config.webServer.port);
	});
}

module.exports = {
	start: start,
	webServer: expressServer,
	webSocketServer: socketIoServer,
	express: express
};