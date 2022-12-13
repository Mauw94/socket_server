import 'reflect-metadata'
import app from './app'
import * as http from 'http'
import socketServer from './socket'

var debug = require('debug')('socketio-server:server')

/**
 * Socket io object
 */
const io = socketServer(server)

/**
 * Get the port from environment and store in Express
 */
var port = normalizePort(process.env.port || '9000')
app.set('port', port)

/**
 * Create the HTTP server
 */
var server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces
 */
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val: any) {
  var port = parseInt(val, 10)

  if (isNaN(port)) return val

  if (port >= 0) return port

  return false
}

function onError(error: any) {
  if (error.syscall != 'listen') throw error

  var bind = typeof port === 'string' ? 'pipe ' + port : 'port ' + port

  // handle specific listen errors
  switch (error.code) {
    case 'EACCESS':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr!.port
  debug('listening on ' + bind)

  console.log('server running in port: ' + port)
}
