var fs = require('fs');
var https = require('https');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var sslOptions = {
	key: fs.readFileSync('server/key.pem'),
	cert: fs.readFileSync('server/cert.pem')
};

var serve = serveStatic('public', {'index': ['index.html']});

handler = function (req, res) {
    var done = finalhandler(req, res);
    serve(req, res, done);
};

var secureServer = https.createServer(sslOptions, handler);
secureServer.listen(3000, function () {
    var address = secureServer.address();
    console.log('Server running on %j', address );
});
