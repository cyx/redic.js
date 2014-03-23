var hiredis = require('hiredis');
var reader = new hiredis.Reader();

function connect() {
    var sock = hiredis.createConnection.apply(hiredis, arguments);

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

    return Object.create({ call: call });
}

module.exports = {
    connect: connect
};
