import dotenv from 'dotenv';
import emitter from '../helpers/events/eventEmitter';
import { emailNotification, requestEmail } from '../helpers/mails/trip.email';
import models from '../database/models';
import NotificationService from './notification';
import SendingMail from './send.email';
import { sock } from '../helpers/events/socket';

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
    try {
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
          notificationOwner: tripRequest.manager_id,
          tripId: tripRequest.id
        });
        const unsubscribeUrl = `http://${BASEURL}:${PORT}/api/notifications`;
        const actionLink = `http://${BASEURL}:${PORT}/api/trips/${tripRequest.id}`;
        const msg = emailNotification(managerNames, message, actionLink, unsubscribeUrl);
        sock.broadcast.emit('new-notification', notificationData);
        SendingMail.sendGridMail(managerEmail, msg);
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
          notificationOwner: data.manager_id,
          tripId: data.id
        });
        const unsubscribeUrl = `http://${BASEURL}:${PORT}/api/notifications`;
        const actionLink = `http://${BASEURL}:${PORT}/api/trips/${data.id}`;
        const msg = emailNotification(managerNames, message, actionLink, unsubscribeUrl);
        sock.broadcast.emit('new-notification', notificationData);
        SendingMail.sendGridMail(managerEmail, msg);
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
          notificationOwner: data.requester_id,
          tripId: data.id
        });
        const unsubscribeUrl = `http://${BASEURL}:${PORT}/api/notifications`;
        const msg = requestEmail(userNames, message, unsubscribeUrl);
        sock.broadcast.emit('new-notification', notificationData);
        SendingMail.sendGridMail(userEmail, msg);
      });
      await emitter.on('comment-created', async (data) => {
        const { firstName, lastName, email } = await users.findOne({ where: { id: data.userId } });
        const { travel_type, from, to } = await trip.findOne({ where: { id: data.tripId } });

        const userNames = `${firstName} ${lastName}`;
        const userEmail = `${email}`;
        const message = `${userNames} has commented on ${travel_type} from ${from} to ${to}`;

        const notificationData = await NotificationService.createNotification({
          message,
          notificationOwner: data.userId,
          tripId: data.tripId
        });

        const unsubscribeUrl = `http://${BASEURL}:${PORT}/api/notifications`;
        const actionLink = `http://${BASEURL}:${PORT}/api/trips/${data.tripId}`;
        const msg = emailNotification(userNames, message, actionLink, unsubscribeUrl);
        sock.broadcast.emit('new-notification', notificationData);
        SendingMail.sendGridMail(userEmail, msg);
      });
    } catch (error) {
      return error.message;
    }
  }
}