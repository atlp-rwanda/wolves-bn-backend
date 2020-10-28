/* eslint-disable class-methods-use-this */
import models from '../database/models';

class ReadNotification {
  async singleNotification(req, res) {
    try {
      const {
        params: { notif_id },
        user: { id },
      } = req;

      const notification = await models.notification
        .findOne({ where: { id: notif_id, notificationOwner: id } });

      if (!notification) return res.status(404).json({ status: 404, Error: 'no notification found' });

      await models.notification
        .update({ isRead: true }, { where: { id: notif_id, notificationOwner: id } });

      res.status(200).json({ status: 200, message: 'successfully marked as read!' });
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  }

  async readAllNotification(req, res) {
    try {
      const { id } = req.user;

      const notification = await models.notification
        .findAll({ where: { notificationOwner: id } });

      if (!notification) return res.status(404).json({ status: 404, Error: 'no notification found' });

      await models.notification
        .update({ isRead: true }, { where: { notificationOwner: id } });

      res.status(200).json({ status: 200, message: 'successfully marked as read!' });
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  }
}

export default new ReadNotification();
