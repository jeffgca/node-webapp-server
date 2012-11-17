#!/usr/bin/env node

var util = require('util'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	http = require('http');

var port;
process.argv.length === 3 ? port = process.argv[2] : port = 8001;

var L = console.log,
	D = util.inspect;

function getMimeType(_path) {
	var ext = path.extname(_path);
	var types = {
		'.html'		: 'text/html',
		'.css' 		: 'text/css',
		'.js' 		: 'text/javascript',
		'.jpeg' 	: 'image/jpeg',
		'.jpg' 		: 'image/jpeg',
		'.png' 		: 'image/png',
		'.json' 	: 'application/json',
		'.pdf' 		: 'application/pdf',
		'.txt' 		: 'text/plain',
		'.xml' 		: 'text/xml',
		'.xml' 		: 'application/rss+xml; charset=ISO-8859-1',
		'.webapp'	: 'application/x-web-app-manifest+json'
	}

	if (types[ext]) {
		return types[ext];
	} 
	else {
		return types['txt'];
	}
}

var server = http.createServer(function (req, res) {
	var parsed = url.parse(req.url);
	var contentType = {'Content-Type': getMimeType(parsed.pathname) };
	var requested_file = path.join(__dirname, parsed.pathname);

	if (!fs.existsSync(requested_file)) {
		L('404: '+req.url+' text/plain');
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.end('404: Not Found');
		return;
	}

	L('200: '+req.url + ' '+contentType['Content-Type']);
	res.writeHead(200, contentType);
	res.end(fs.readFileSync(requested_file, 'utf8'));
}).listen(port);

L('Listening on port '+port);
