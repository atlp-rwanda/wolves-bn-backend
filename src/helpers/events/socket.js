/* eslint-disable import/prefer-default-export */
import socketJwt from 'socketio-jwt';

const io = require('socket.io')();

const users = {};

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
        if (users[user.email]) {
          disconnect = false;
        }
        userName = user.email;
        users[user.email] = socket;
        socket.broadcast.emit('user-connected', user);
      });
    });
};

export { socketSetup, io, users };