/* eslint-disable no-alert */
/* eslint-disable no-undef */
const socket = io.connect('http://localhost:3000');
const btn = document.getElementById('sendN');
const Notification = window.Notification || window.mozNotification || window.webkitNotification;

socket.on('new-notification', (data) => {
  const notification = new Notification('Trip Request', {
    body: data.message
  });
});