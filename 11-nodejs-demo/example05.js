var crypto = require('crypto');
var fs = require('fs');
var zlib = require('zlib');

var password = Buffer.from(process.env.PASS || 'password');
var encryptStream = crypto.createCipher('aes-256-cbc', password);

var gzip = zlib.createGzip();
var readStream = fs.createReadStream(__filename); // current file
var writeStream = fs.createWriteStream(__dirname + '/out.gz');

readStream   // reads current file
  .pipe(encryptStream) // encrypts
  .pipe(gzip)  // compresses
  .pipe(writeStream)  // writes to out file
  .on('finish', function () {  // all done
    console.log('Encription and compression done.');
  });

  // New comment 18.05.2021