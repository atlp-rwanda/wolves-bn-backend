/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import models from '../database/models';

export default class Comment {
  static async list(req, res) {
    const id = req.params.id;
    const tripId = req.params.tripId;
    const trip = await models.trip.findOne({ where: { id } });
    const comment = await models.comment.findOne({ where: { tripId } });
    if ((!trip) || (!comment)) {
      return res.status(404).send({ status: 404, error: `One of id from Trips : "${id}" or tripId from comments "${tripId}" does not exist !` });
    }
    if (id !== tripId) {
      return res.status(404).send({ status: 404, error: `The Trip Identification(from Trips): ${id} does not match to the specified trip Id from Comments: ${tripId}!` });
    }
    return models.comment.findAll({ where: { tripId } })
      .then((models) => res.status(200).send(models));
  }

  static async postComment(req, res) {
    try {
      const { comment } = req.body;
      const tripId = req.params.id;
      const { id } = req.user;
      const tripExist = await models.trip.findOne({ where: { id: tripId } });
      if (!tripExist) {
        return res.status(400).send({ message: ` Trip ID: "${tripId}" does not Exist !` });
      }
      if ((tripExist.requester_id === id) || (tripExist.manager_id === id)) {
        const saveComment = await models.comment.create({ tripId, userId: id, comment });
        return res.status(201).send({ saveComment, message: `Successfully commented on ${tripId}` });
      }
      return res.status(400).send({ message: ` Please check well, the Trip Id : " ${tripId} "does not belong to you!!!` });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async deleteComment(req, res) {
    const id = req.params.id;
    models.comment.destroy({ where: { id } })
      .then(num => {
        if (num === 1) {
          res.status(200).send({ message: `Successfully Deleted comment with id=${id}` });
        } else {
          res.status(404).send({ Error: `Cannot delete comment with id=${id}.maybe Not Found in Database` });
        }
      });
  }
}
