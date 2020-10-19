import models from '../database/models';

const { notification } = models;

export default class NotificationService {
  static async createNotification(data) {
    return notification.create(data);
  }
}