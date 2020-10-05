/* eslint-disable camelcase */
import { request } from 'express';
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
      const tripExist = await models.trip.findOne({ where: { id: tripId } });
      if (!tripExist) {
        return res.status(404).send({ status: 404, error: `The provided trip Id "${tripId}" doesnot Exist` });
      }
      if (tripExist) {
        const requester_id = tripExist.requester_id;
        const manager_id = tripExist.manager_id;
        if (requester_id == null || requester_id === '' || requester_id === 'undefined') {
          return res.status(404).send({ status: 404, error: `The provided trip Id "${requester_id}" doesnot belong to any Requester !` });
        } if ((requester_id !== id) && (manager_id !== id)) {
          return res.status(400).send({ status: 400, error: `The Trip Id  "${tripId} " which you are commenting on doesnot belong to you !` });
        }
        // if (manager_id === 0) {
        if (manager_id == null || manager_id === '' || manager_id === 'undefined') {
          return res.status(404).send({ status: 404, error: `The provided trip Id  "${tripId}" is not assigned to any Manager !` });
        }
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
}
