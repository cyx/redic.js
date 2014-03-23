var redic = require('./index');

var client = redic.connect(10001, 'localhost');

client.call(['AUTH', 'test'], function(err, res) {
    console.log(err, res);

    client.call(['SET', 'foo', 'bar'], function(err, res) {
        client.call(['GET', 'foo'], function(err, res) {
            console.log(err, res);
        
            client.call(['QUIT']);
        });
    });
});
