const dns = require('dns').promises;

(async () => {
    const addresses = await dns.resolve4('yahoo.com');
    console.log(addresses);
    addresses.forEach(async (addr) => {
        const hostnames = await dns.reverse(addr);
        console.log(`Address [${addr}] => ${JSON.stringify(hostnames)}`);
    })
}) (); // IIFE