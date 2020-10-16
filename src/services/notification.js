import models from '../database/models';
import { Users } from '../helpers/events/events';

const { Notifications } = models;

export default class NotificationService {
  static async createNotification(notification) {
    return Notifications.create(notification);
  }

  static async sendNotifications(receiver, notification) {
    if (!Users[receiver]) return 0;
    Users[receiver].emit('new-notification', notification);
  }
}