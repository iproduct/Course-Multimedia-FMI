const dns = require('dns');

dns.resolve4('yahoo.com', function(err, addresses){
    if(err) throw err;
    console.log(addresses);
    addresses.forEach(a =>{
        dns.reverse(a, (err, hostnames) => {
            console.log(`${a}: ${JSON.stringify(hostnames)}`);
        })
    })
})