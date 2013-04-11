# pushserve

Dead-simple node.js pushState-enabled command-line http server.

## Usage

* Install it with `npm`: `npm install -g pushserve`.
* Launch: `pushserve`.
* You may specify port (default is 8000): `pushserve --port 4567`.

```
  Usage: pushserve [options]

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -p, --port <port>       Web server port [8000]
    -P, --path <path>       Path [.]
    -i, --indexPath <path>  Path to file which to which 404s will be redirected [index.html]
    -c, --noCors            Disable cross-origin resource sharing
    -s, --noPushstate       Disable pushState
```

Node.js API:

```javascript
var pushserve = require('pushserve');
// Any of these ways.
pushserve();
pushserve(function(error, options) {
  console.log('Launched');
});
pushserve({port: 4567, indexPath: '../index.html', noCors: true});
pushserve({port: 5555}, function() {
  console.log('Launched');
});
```

Additionally, node.js API also adds `noLog` option with which
default server start message won’t be printed.

You can stop the server in node with `var server = pushserve(); server.close();`.

## License

MIT
