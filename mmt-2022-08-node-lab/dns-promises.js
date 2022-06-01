const dns = require('dns').promises;

dns.resolve4('yahoo.com').then(addresses => {
    console.log(addresses);
    addresses.forEach(addr => {
        dns.reverse(addr).then(hostnames => {
            console.log(`Address [${addr}] => ${JSON.stringify(hostnames)}`)
        });
    })
});