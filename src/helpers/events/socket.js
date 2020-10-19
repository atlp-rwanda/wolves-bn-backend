const socketio = require('socket.io');

const io = socketio();
const socketSetup = (server) => {
  io.attach(server);
  io.sockets.on('connection', (socket) => {
    console.log('Hello My Friend', socket.id);
    socket.on('disconnect', () => {
      console.log('User has left');
    });

    socket.on('new-notification', (data) => {
      console.log('Holla');
      io.sockets.emit('new-notification', data);
    });
  });
};

export { socketSetup, io };
