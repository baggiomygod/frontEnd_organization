const { IPCClient } = require('../src');
const { packet, seq } = require('tiny-application-layer-protocol');
const client = new IPCClient();
client.write(packet('hello', seq()));
client.on('data', function(res) {
  console.log('receive', res);
})