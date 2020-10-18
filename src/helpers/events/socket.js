const socketio = require('socket.io');

const io = socketio();
const Users = {};
const socketSetup = (server) => {
  io.attach(server);
  io.on('connection', (socket) => {
    console.log('Hello My Friend', socket.id);
    socket.on('request-created', ({ data }) => {
      console.log(data);
    });
    socket.on('disconnect', () => {
      console.log('User has left');
    });
  });
};

export { socketSetup, io, Users };
