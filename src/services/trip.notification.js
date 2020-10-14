import emitter from '../helpers/events/events';
import { tripEmailBody } from '../helpers/mails/trip.email';
import models from '../database/models';
import NotificationService from './notification';
import SendMail from './send.email';

const { users } = models;

export default class TripNotification {
  static async findManagerToNotify(trip) {
    const { manager_id } = await users.findOne({ where: { id: trip.manager_id } });

    const manager = await users.findOne({ where: { id: manager_id } });
    return {
      id: manager_id,
      managerEmail: manager.email,
      managerNames: `${manager.firstName} ${manager.lastName}`
    };
  }

  static async sendTripNotification() {
    await emitter.on('request-created', async (trip) => {
      const {
        id,
        managerEmail,
        managerNames
      } = await this.findManagerToNotify(trip);

      const { firstName, lastName } = await users.findOne({ where: { id: trip.requester_id } });
      const message = `New ${trip.travel_type} trip have been requested by ${firstName} ${lastName}`;

      const notificationData = NotificationService.createNotification({
        type: 'new_request',
        message,
        requester_id: id
      });

      const msg = tripEmailBody(managerNames, message);
      this.sendNotifications(managerEmail, notificationData, msg);
    });
  }

  static async sendNotifications(email, msg, notificationData) {
    NotificationService.sendNotification(email, notificationData);
    SendMail.sendGridEmail(email, msg);
  }
}