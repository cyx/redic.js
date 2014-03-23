var assert = require('assert');
var redic = require('./index');

var client = redic.connect(10001, 'localhost');

client.call(['AUTH', 'test'], function(err, res) {
    assert(err === null);

    client.call(['SET', 'foo', 'bar'], function(err, res) {
        assert(res === 'OK');

        client.call(['GET', 'foo'], function(err, res) {
            assert(res === 'bar');
        
            client.call(['QUIT']);
        });
    });
});
