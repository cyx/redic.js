var hiredis = require('hiredis');
var reader = new hiredis.Reader();
var slice = Array.prototype.slice;

// Usage:
//
//     var redic = require('redic.js');
//
//     // Common style
//     var client = redic.connect(6379, 'localhost', { maxListeners: 1000 });
//
//     // If you're going to use the connection for massively
//     // parallel stuff, you'll probably need to increase
//     // maxListeners like so:
//     redic.connect(6379, 'localhost', { maxListeners: 1000 });
//
function connect(port, host, options) {
    var sock = hiredis.createConnection(port, host);

    if (options && options.maxListeners) {
        sock.setMaxListeners(options.maxListeners);
    }

    function write(args, fn) {
        fn = fn || function() {}

        sock.once('reply', function(data) {
            fn(null, data);
        });

        sock.once('error', function(err) {
            fn(err);
        });

        sock.write.apply(sock, args);
    }

    // Usage: client.call('GET', 'foo', callback);
    function call() {
        var args = slice.call(arguments);
        var cb = null;

        if (typeof args[args.length - 1] === 'function') {
            cb = args.pop();
        }

        write(args, cb);
    }

    function quit() {
        call('QUIT');
    }

    return Object.create({ call: call, quit: quit });
}

module.exports = {
    connect: connect
};
