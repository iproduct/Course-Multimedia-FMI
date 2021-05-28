const dns = require('dns');

dns.resolve4('yahoo.com', function(err, addresses){
    if(err) throw err;
    console.log(`Addresses: ${JSON.stringify(addresses)}`);
});