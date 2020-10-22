import models from '../database/models';
import emitter from '../helpers/events/eventEmitter';

const {
  trip, users, location, accomodation
} = models;

export default class Trip {
  static createTrips(req, res) {
    const {
      from, to, travel_date, return_date, travel_reason, accommodation
    } = req.body;
    const { id, manager_id } = req.user;
    let travelType;

    if (return_date == null) { travelType = 'One way trip'; } else {
      travelType = 'Return trip';
    }
    if (from === to) { return res.status(409).send({ message: 'The departure can not be the same as destination' }); }
    if (travel_date === return_date) { return res.status(409).send({ message: 'Travel date can not be the same as date to return' }); }

    location.findOne({ where: { id: from } }).then((locInfo) => {
      if (!locInfo) {
        return res.status(404).send({ message: 'No such departure location' });
      }

      location.findOne({ where: { id: to } }).then((info) => {
        if (!info) {
          return res.status(404).send({ message: 'No such destination location' });
        }

        accomodation.findOne({ where: { id: accommodation } }).then((accInfo) => {
          if (!accInfo) { return res.status(404).send({ message: 'No such accommodation in your trip destination' }); }
          trip.findOne({ where: { requester_id: id } }).then((tripInfo) => {
            if (tripInfo) { return res.status(409).send({ message: 'You have an ongoing trip' }); }
            return models.trip.create({
              requester_id: id,
              manager_id,
              from,
              to,
              travel_type: travelType,
              travel_date,
              return_date,
              travel_reason,
              accommodation,
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
            }).then(data => {
              emitter.emit('request-created', data);
              res.status(201).send(data);
            })
              .catch(error => res.status(400).send(error));
          });
        });
      });
    });
  }

  static async updateTrip(req, res) {
    const {
      from, to, travel_date, return_date, travel_reason, accommodation
    } = req.body;
    const { id: requester_id } = req.user;
    const { id } = req.params;
    let travelType;
    if (return_date == null) { travelType = 'One way trip'; } else {
      travelType = 'Return trip';
    }
    return models.trip
      .findOne({ where: { id, requester_id } })
      .then(data => {
        if (!data) {
          return res.status(404).send({
            message: 'Trip Not Found',
          });
        }
        if (from === to) { return res.status(409).send({ message: 'The departure can not be the same as destination' }); }

        if (travel_date === return_date) { return res.status(409).send({ message: 'Travel date can not be the same as date to return' }); }

        location.findOne({ where: { id: from } }).then((locInfo) => {
          if (!locInfo) {
            return res.status(404).send({ message: 'No such departure location' });
          }

          location.findOne({ where: { id: to } }).then((info) => {
            if (!info) {
              return res.status(404).send({ message: 'No such destination location' });
            }

            accomodation.findOne({ where: { id: accommodation } }).then((accInfo) => {
              if (!accInfo) { return res.status(404).send({ message: 'No such accommodation in your trip destination' }); }
              return data
                .update({
                  from,
                  to,
                  travel_type: travelType,
                  travel_date,
                  return_date: return_date || null,
                  travel_reason,
                  accommodation
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
                .then((result) => {
                  emitter.emit('request-updated', result);
                  res.status(200).send(data);
                })
                .catch((error) => res.status(500).send(error));
            });
          });
        });
      }).catch((error) => res.status(500).send(error));
  }

  static deleteTrip(req, res) {
    const { id } = req.params;
    const { id: requester_id } = req.user;
    return models.trip
      .destroy({
        where: { id, requester_id }
      }).then(data => {
        if (data) res.status(201).json({ deleted: data, message: 'deleted successfully' });
        else res.status(409).json({ message: 'Nothing to delete' });
      }).catch(error => res.status(409).send(error));
  }

  static Requests(req, res) {
    const { id, role } = req.user;
    const isManager = role === 'manager';
    const query = isManager ? { manager_id: id } : { requester_id: id };
    return models.trip.findAll({
      where: query,
      include: [
        {
          model: models.location,
          as: 'departure'
        },
        {
          model: models.location,
          as: 'destination'
        }, {
          model: models.accomodation,
          as: 'place_to_stay'
        },
        {
          model: models.users,
          as: 'requester',
          attributes: ['firstName', 'lastName', 'email']
        }]
    }).then((info) => {
      res.status(200).send(info);
    }).catch(err => res.status(409).send(console.log(err)));
  }
}
