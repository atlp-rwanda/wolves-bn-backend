import dotenv from 'dotenv';
import emitter from '../helpers/events/eventEmitter';
import { emailNotification, requestEmail } from '../helpers/mails/trip.email';
import models from '../database/models';
import NotificationService from './notification';
import SendingMail from './send.email';

dotenv.config();

const { users, trip, preferences } = models;
const BASEURL = process.env.BASEURL || 'localhost';
const PORT = process.env.PORT || 3000;

export default class TripNotification {
  static async findManagerToNotify(tripRequest) {
    const manager = await users.findOne({ where: { id: tripRequest.manager_id } });
    const {
      emailnotification, appnotification
    } = await preferences.findOne({ where: { requester_id: manager.id } });
    const managerPreferences = { emailnotification, appnotification };
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
      const message = `New ${tripRequest.travel_type} travelling on ${tripRequest.travel_date} have been requested by ${firstName} ${lastName}`;

      const notificationData = await NotificationService.createNotification({
        message,
        requester_id: tripRequest.manager_id,
        tripId: tripRequest.id
      });
      const unsubscribeUrl = `http://${BASEURL}:${PORT}/api/notifications`;
      const actionLink = `http://${BASEURL}:${PORT}/api/users/tripRequest/${tripRequest.id}`;
      const msg = emailNotification(managerNames, message, actionLink, unsubscribeUrl);
      // emitter.emit('new-notification', notificationData);
      // SendingMail.sendGridMail(managerEmail, msg);
    });
    await emitter.on('request-updated', async (data) => {
      const {
        managerEmail,
        managerNames
      } = await this.findManagerToNotify(data);

      const {
        firstName, lastName
      } = await users.findOne({ where: { id: data.requester_id } });
      const message = `${data.travel_type} by ${firstName} ${lastName} has been updated to travel on ${data.travel_date}`;

      const notificationData = await NotificationService.createNotification({
        message,
        requester_id: data.manager_id,
        tripId: data.id
      });
      const unsubscribeUrl = `http://${BASEURL}:${PORT}/api/notifications`;
      const actionLink = `http://${BASEURL}:${PORT}/api/users/tripRequest/${data.id}`;
      const msg = emailNotification(managerNames, message, actionLink, unsubscribeUrl);
      // SendingMail.sendGridMail(managerEmail, msg);
    });
    await emitter.on('request-status-updated', async (data) => {
      const {
        firstName, lastName, email
      } = await users.findOne({ where: { id: data.requester_id } });
      const userNames = `${firstName} ${lastName}`;
      const userEmail = `${email}`;
      const message = `Your trip request has been ${data.request_status} by your manager`;

      const notificationData = await NotificationService.createNotification({
        message,
        requester_id: data.requester_id,
        tripId: data.id
      });
      const unsubscribeUrl = `http://${BASEURL}:${PORT}/api/notifications`;
      const msg = requestEmail(userNames, message, unsubscribeUrl);
      SendingMail.sendGridMail(userEmail, msg);
    });
  }
}