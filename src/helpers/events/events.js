import EventEmitter from 'events';
import socketJwt from 'socketio-jwt';

export default new EventEmitter();
const io = require('socket.io')();

const Users = {};
const socketSetup = () => {
  io.on('connection', (socket) => {
    console.log('Socket Connected with id:', socket.id);

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
io.on('connection', (socket) => {
  console.log('Socket Connected with id:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

export { socketSetup, io, Users };
