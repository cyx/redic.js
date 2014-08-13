var test = require('tape');
var redic = require('./index');

test('basic usage', function(t) {
    t.plan(3);

    var client = redic.connect(10001, 'localhost');

    client.call(['AUTH', 'test'], function(err, res) {
        t.assert(err === null, 'AUTH: OK');

        client.call(['SET', 'foo', 'bar'], function(err, res) {
            t.assert(res === 'OK', 'SET: OK');

            client.call(['GET', 'foo'], function(err, res) {
                t.assert(res === 'bar', 'GET: OK');

                // Let's use the raw QUIT style here
                // to try it out.
                client.call(['QUIT']);
            });
        });
    });
});

test('maxlisteners', function(t) {
    t.plan(2);

    // Empirical tests show that 1002 is the minimum you need
    // to do a 1K loop below.
    //
    // If you change it to 1001 you'll get an error.
    var client = redic.connect(10001, 'localhost', { maxListeners: 1002 });

    client.call(['AUTH', 'test'], function(err, res) {
        t.assert(err === null, 'AUTH: OK');

        var total = 0;
        var success = 0;

        for (var i = 0; i < 1000; i++) {
            client.call(['PING'], function(err) {
                if (err === null) success++;

                total++;

                if (total === 1000) {
                    t.assert(success === 1000, '1000 PINGs: OK');

                    // We use the syntatic sugar `quit`.
                    client.quit();
                }
            });
        }
    });
});

