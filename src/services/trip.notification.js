import dotenv from 'dotenv';
import emitter from '../helpers/events/eventEmitter';
import { emailNotification } from '../helpers/mails/trip.email';
import models from '../database/models';
import NotificationService from './notification';
import SendingMail from './send.email';

dotenv.config();

const { users, trip } = models;
const BASEURL = process.env.BASEURL || 'localhost';
const PORT = process.env.PORT || 3000;

export default class TripNotification {
  static async findManagerToNotify(tripRequest) {
    const manager = await users.findOne({ where: { id: tripRequest.manager_id } });
    return {
      managerEmail: manager.email,
      managerNames: `${manager.firstName} ${manager.lastName}`
    };
  }

  static async sendTripNotification() {
    await emitter.on('request-created', async (tripRequest) => {
      const {
        managerEmail,
        managerNames
      } = await this.findManagerToNotify(tripRequest);

      const {
        firstName, lastName
      } = await users.findOne({ where: { id: tripRequest.requester_id } });
      const message = `New ${tripRequest.travel_type} have been requested by ${firstName} ${lastName}`;

      const notificationData = await NotificationService.createNotification({
        message,
        requester_id: tripRequest.requester_id,
        tripId: tripRequest.id
      });
      const unsubscribeUrl = `http://${BASEURL}:${PORT}/api/notifications`;
      const msg = emailNotification(managerNames, message, unsubscribeUrl);
      SendingMail.sendGridMail(managerEmail, msg);
    });
  }

  // static async sendNotifications(managerEmail, msg, notificationData) {
  //   console.log('Hello World');
  //   SendingMail.sendGridMail(managerEmail, msg);
  // }
}