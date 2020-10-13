/* eslint-disable import/prefer-default-export */
import socketJwt from 'socketio-jwt';

const io = require('socket.io')();

const Users = {};

const socketSetup = (server) => {
  io.attach(server);
  let userName;
  let disconnect;
  io.sockets
    .on('connection', socketJwt.authorize({
      secret: process.env.SECRET_OR_KEY,
      timeout: 15000
    }))
    .on('authenticated', (socket) => {
      socket.emit('success', socket.decoded_token);
      socket.on('new-user', (user) => {
        if (Users[user.email]) {
          disconnect = false;
        }
        userName = user.email;
        Users[user.email] = socket;
        socket.broadcast.emit('user-connected', user);
      });
    });
};

export { socketSetup, io, Users };