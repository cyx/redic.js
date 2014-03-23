# redic.js

Inspired from [Redic](https://github.com/amakawa/redic)

# usage

```javascript
var redic = require('redic');
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
```

# why?

an initial attempt for a simpler Redis client for node.

# roadmap

- remove hiredis? (because of compatibility with node 0.11.x)
- more testing

# license

MIT
