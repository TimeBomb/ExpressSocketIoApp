import path from 'path';

function initialize(server) {
	server.get('/', function(request, response) {
		response.sendFile(path.resolve(__dirname + '/../web/index.html'));
	});
}

module.exports = {
	initialize: initialize
};