var hiredis = require('hiredis');
var reader = new hiredis.Reader();

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

    function call(args, fn) {
        fn = fn || function() {}

        sock.once('reply', function(data) {
            fn(null, data);
        });

        sock.once('error', function(err) {
            fn(err);
        });

        sock.write.apply(sock, args);
    }

    function quit() {
        call(['QUIT']);
    }

    return Object.create({ call: call, quit: quit });
}

module.exports = {
    connect: connect
};
