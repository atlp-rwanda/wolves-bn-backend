import models from '../database/models';

const { notification } = models;

export default class Notifications {
  static async getAllNotifications(req, res) {
    const { id } = req.user;
    return notification.findAll({ where: { notificationOwner: id } })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  }
}