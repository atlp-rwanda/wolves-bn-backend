<<<<<<< HEAD
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import models from '../database/models';

export default class Comment {
  static async list(req, res) {
    const { id } = req.user;
    return models.comment.findAll({ where: { userId: id }, })
      .then((models) => res.status(200).send(models))
      .catch((error) => {
        res.status(404).send(error);
      });
  }

  static async postComment(req, res) {
    try {
      const { comment } = req.body;
      const tripId = req.params.id;
      const { id } = req.user;
      const existRequestorTrip = await models.trip.findOne({ where: { id: tripId } });
      if (!existRequestorTrip) {
        return res.status(404).send({ status: 404, error: 'The trip request number does not exist !' });
      }
      const commentCreate = await models.comment.create({ tripId, userId: id, comment });
      return res.status(201).send({ commentCreate });
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
      })
      .catch(error => res.status(500).send({ error: `Unknown Error when deleting comment with ${id}` }));
  }
=======
/* eslint-disable no-undef */
import models from '../database/models';

export default class Comment {
  static async list(req, res) {
    const ids = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    return models.comment.findAll({
      where: {
        id: ids
      },
    })
      .then((model) => res.status(200).send(models))
      .catch((error) => {
        console.log(error);
        res.status(404).send(error);
      });
  }

  static async postComment(req, res) {
    try {
      const { travelReqID, userEmail, userComment } = req.body;
      // const existComment = await models.comment.findOne({ where: { id: req.body.id } });
      // if (!existComment) {
      //   return res.json({
      //     message: 'the request number does not exist !!!!!!!!'
      //   });
      // }
      const comment = await models.comment.create({ travelReqID, userEmail, userComment });
      return res.status(201).send({ comment });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  static async deleteComment(req, res) {
    try {
      const id = req.params.id;
      const comment = await models.comment.findOne({ where: { id } });
      if (!comment) return res.status(404).send({ status: 404, error: 'Comment not found!' });
      await models.comment.destroy({ where: { id } });
      return res.status(204).send({ status: 204, Message: 'Successful deleted comment !!!' });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
>>>>>>> a6f9522... (ft-comment-delete-travel-174772229):post comments and delete
}