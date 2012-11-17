#!/usr/bin/env node

var util = require('util'),
	fs = require('fs'),
	path = require('path'),
	url = require('url')

var http = require('http');
var fs = require('fs');
// var index = fs.readFileSync('index.html');

var port;

function isWebAppManifest(_url) {
	return (_url.pathname.indexOf('.webapp') !== -1);
}


var pp = function(o) { return JSON.stringify(o,null,'  ')};
// port

// console.log(pp(process.argv), process.argv.length);
// process.exit();

process.argv.length === 3 ? port = process.argv[2] : port = 8001;

http.createServer(function (req, res) {
	var contentType = {'Content-Type': 'text/html'}

	if (!fs.existsSync(requested_file)) {
		res.writeHead(404, contentType);
		res.end('404: Not Found')
		return;
	}


	var parsed = url.parse(req.url);
	var requested_file = path.join(__dirname, parsed.pathname);

	var contentType = {'Content-Type': 'text/html'}

	if (isWebAppManifest(parsed)) {
		contentType = {'Content-Type': 'application/x-web-app-manifest+json'};
	}

	res.writeHead(200, contentType);

	res.end(requested_file);

}).listen(port);
