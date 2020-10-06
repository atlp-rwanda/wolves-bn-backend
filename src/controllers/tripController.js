/* eslint-disable camelcase */
import models from '../database/models';

const { trip, users, location } = models;

export default class Trip {
  static async createTrips(req, res) {
    const {
      from, to, travel_date, return_date, travel_reason
    } = req.body;
    const { id: requester_id, manager_id } = req.user;
    let travelType;

    if (return_date == null) { travelType = 'One way trip'; } else {
      travelType = 'Return trip';
    }
    await models.trip.create({
      requester_id,
      manager_id,
      from,
      to,
      travel_type: travelType,
      travel_date,
      return_date,
      travel_reason,
    }, {
      include: [
        {
          model: models.location,
          as: 'departure'
        },
        {
          model: models.location,
          as: 'destination'
        }
      ]
    }).then(data => res.status(201).send(data)).catch(error => res.status(400).send(error));
  }

  static updateTrip(req, res) {
    const {
      from, to, travel_date, return_date, travel_reason
    } = req.body;
    let travelType;
    if (return_date == null) { travelType = 'One way trip'; } else {
      travelType = 'Return trip';
    }
    return models.trip
      .findByPk(req.params.id)
      .then(data => {
        if (!data) {
          return res.status(404).send({
            message: 'Trip Not Found',
          });
        }

        return trip
          .update({
            from,
            to,
            travel_type: travelType,
            travel_date,
            return_date: return_date || null,
            travel_reason,
          }, {
            include: [
              {
                model: models.location,
                as: 'departure'
              },
              {
                model: models.location,
                as: 'destination'
              }
            ]
          })
          .then(() => res.status(200).send(trip))
          .catch((error) => res.status(500).send(error));
      })
      .catch((error) => res.status(500).send(error));
  }

  static deleteTrip(req, res) {
    const { id } = req.params;
    return models.trip
      .destroy({
        where: { id }
      }).then(data => {
        if (data) res.status(201).json({ deleted: data, message: 'deleted successfully' });
        else res.status(409).json({ message: 'Nothing to delete' });
      }).catch(error => res.status(409).send(error));
  }

  static Requests(req, res) {
    const { id, role } = req.user;
    const isManager = role === 'manager';
    const query = isManager ? { manager_id: id } : { requester_id: id };
    return trip.findAll({
      where: query,
      include: [
        {
          model: location,
          as: 'departure'
        },
        {
          model: location,
          as: 'destination'
        },
        {
          model: users,
          as: 'requester',
          attributes: ['firstName', 'lastName', 'email']
        }]
    }).then((info) => {
      res.status(200).send(info);
    }).catch(err => res.status(409).send(err));
  }
}
