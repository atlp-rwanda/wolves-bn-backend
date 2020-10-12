import models from '../database/models';
import emitter from '../helpers/events/events';
import users from '../helpers/events/socket';

const { Notification } = models;

const createNotification = (notification) => Notification.create(notification);

export default class Notifications {
  static sendNotification(receiver, notification) {
    if (!users[receiver]) return 0;
    users[receiver].emit('new-notification', notification);
  }
}