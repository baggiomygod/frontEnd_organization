const net = require('net')
const { EventEmitter } = require('event')
const { path } = require('./config.js')

class Client extends EventEmitter {
  constructor(options) {
    super()
    this.options = { path, ...options }
    const socket = net.connect(this.options)
    socket.on('error', (error) => {
      console.error(error)
    })
    return socket
  }
}

module.exports = {
  Client
}
