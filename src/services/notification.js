import models from '../database/models';
import { Users } from '../helpers/events/socket';

const { notification } = models;

export default class NotificationService {
  static async createNotification(data) {
    return notification.create(data);
  }

  static async sendNotifications(receiver, data) {
    if (!Users[receiver]) return 0;
    Users[receiver].emit('new-notification', data);
  }
}