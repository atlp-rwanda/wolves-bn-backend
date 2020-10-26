/* eslint-disable no-var */
/* eslint-disable import/no-mutable-exports */
const socketio = require('socket.io');

const io = socketio();
var sock;
const socketSetup = (server) => {
  io.attach(server);

  io.sockets.on('connection', (socket) => {
    sock = socket;
    socket.on('disconnect', () => {
      console.log('User has left');
    });
  });
};

export { socketSetup, sock, io };
