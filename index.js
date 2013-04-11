var express = require('express');
var http = require('http');
var sysPath = require('path');

// startServer :: String -> Number -> {base: String, indexPath: String, cors: Boolean, pushState: Boolean} -> Function
var startServer = function(path, port, options, callback) {
  // Specify default options.
  if (path == null) path = '.';
  if (port == null) port = 8000;
  if (options == null) options = {};
  if (options.base == null) options.base = '';
  if (options.indexPath == null) options.indexPath = sysPath.join(path, 'index.html')
  if (options.cors == null) options.cors = true;
  if (options.pushState == null) options.pushState = true;
  if (callback == null) callback = Function.prototype;

  var app = express();

  // Send cross-origin resource sharing enabling header.
  if (options.cors) {
    app.use(function(request, response, next) {
      response.header('Cache-Control', 'no-cache');
      response.header('Access-Control-Allow-Origin', '*');
      next();
    });
  }

  // Route all static files to http paths.
  app.use(options.base, express.static(path));

  // Route all non-existent files to `index.html`
  if (options.pushState) {
    app.all('' + options.base + '/*', function(request, response) {
      response.sendfile(indexPath);
    });
  }

  // Wrap express app with node.js server in order to have stuff like server.stop() etc.
  var server = http.createServer(app);
  server.listen(port, function(error) {
    console.log('Serving HTTP on 0.0.0.0 port', port);
    callback(error);
  });
  return server;
};

module.exports = startServer;
