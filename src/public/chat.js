/* eslint-disable no-alert */
/* eslint-disable no-undef */
const socket = io.connect('http://localhost:3000');

const Notification = window.Notification || window.mozNotification || window.webkitNotification;

function showNotification() {
  const notification = new Notification('New Message from Irenee', {
    body: 'Hey Mate, how are you?'
  });
}

if (Notification.permission === 'granted') {
  showNotification();
} else if (Notification.permission !== 'denied') {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      showNotification();
    }
  });
}