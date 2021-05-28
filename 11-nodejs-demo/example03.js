var irc = require('irc');
var client = new irc.Client('irc.freenode.net', 'my_bot3', {
  channels: ['#node_channel']
});

client.on('error', function (message) {
  console.error('error: ', message);
});

client.on('connect', function () {
  console.log('connected to the irc server');
});

client.on('message', function (from, to, message) {
  console.log(from + ' => ' + to + ': ' + message);
});

client.join('#node_channel');
setTimeout(function () {
  client.say('#node_channel', "I'm Trayan's a bot!");
  setTimeout(function () {
    client.say('#node_channel', "Am a happy bot!");
    setTimeout(function () {
      client.part('#node_channel');
      process.exit(0);
    }, 30000);
  }, 5000);
}, 10000);