/* eslint-disable no-alert */
/* eslint-disable no-undef */
const socket = io.connect('http://localhost:3000');
const btn = document.getElementById('sendN');

// const Notification = window.Notification || window.mozNotification || window.webkitNotification;

btn.addEventListener('click', () => {
  socket.emit('new-notification', ({ message: 'Hello You!' }));
});

socket.on('new-notification', (data) => {
  const notification = new Notification('New Message from Irenee', {
    body: data.message
  });
});
