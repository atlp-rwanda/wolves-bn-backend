import models from '../database/models';

const { notification, users } = models;

export default class NotificationService {
  static async createNotification(data) {
    return notification.create(data);
  }

  static async findManagerToNotify(tripRequest) {
    const manager = await users.findOne({ where: { id: tripRequest.manager_id } });
    return {
      managerEmail: manager.email,
      managerNames: `${manager.firstName} ${manager.lastName}`
    };
  }
}