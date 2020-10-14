/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable camelcase */
import { date } from 'joi';
import { Op } from 'sequelize';
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

  // get stats of trips made in the last X timeframe
  static async statsTrips(req, res) {
    const { id } = req.user;
    const start_time = new Date(req.params.start_time);
    const end_time = new Date(req.params.end_time);
    if (Object.prototype.toString.call(start_time) === '[object Date]') {
      if (isNaN(start_time.getTime())) {
        return res.status(400).json({ Message: 'Invalid start Date' });
      } if (isNaN(end_time.getTime())) {
        return res.status(400).json({ Message: 'Invalid End Date' });
      }
    }
    const userExist = await models.users.findOne({ where: { id } });
    const role = userExist.role;
    if (role == null) { return res.status(400).json({ Error: `${userExist.FirstName} No Trip associated to you` }); }
    if (userExist.role === 'requester') {
      if (start_time > end_time) { return res.status(400).json({ Message: 'End Date should be greater that start Date' }); }
      const tripExist = await models.trip.findAll({
        where: {

          travel_date: {
            [Op.lte]: req.params.end_time,
            [Op.gte]: req.params.start_time,
          },
          requester_id: id
        }
      });
      // for the requester
      if (!tripExist || tripExist == null || tripExist.length < 1 || tripExist === undefined) {
        return res.status(404).send({ status: 404, error: `No Data Found between "${start_time}" and " ${end_time} ",  maybe No trip occurred during the given dates ` });
      }
      const tripcount = await models.trip.count({
        where: {
          travel_date: {
            [Op.lte]: end_time,
            [Op.gte]: start_time,
          },
          requester_id: id
        }
      });
      const approvedTrips = await models.trip.count({
        where: {
          travel_date: {
            [Op.lte]: end_time,
            [Op.gte]: start_time,
          },
          request_status: 'approved',
          requester_id: id
        }
      });
      const rejectedTrips = await models.trip.count({
        where: {
          travel_date: {
            [Op.lte]: end_time,
            [Op.gte]: start_time,
          },
          request_status: 'rejected',
          requester_id: id
        }
      });
      const pendingTrips = tripcount - (approvedTrips + rejectedTrips);
      return res.status(200).send({
        Date: new Date(),
        Report: `Dear "${userExist.role}" , from "${start_time}" to "${end_time}", is the SUMMARY of trips you made on: `,
        First_Name: userExist.firstName,
        last_Name: userExist.lastName,
        phone: userExist.phone,
        email: userExist.email,
        tripNumber: tripcount,
        Pending: pendingTrips,
        Approved: approvedTrips,
        Rejected: rejectedTrips,
      });
    }
    // for Manager
    if (start_time > end_time) { return res.status(400).json({ Message: 'End Date should be greater that start Date' }); }
    const tripExist = await models.trip.findAll({
      where: {

        travel_date: {
          [Op.lte]: req.params.end_time,
          [Op.gte]: req.params.start_time,
        },
        manager_id: id
      }
    });
    if (!tripExist || tripExist == null || tripExist.length < 1 || tripExist === undefined) {
      return res.status(404).send({ status: 404, error: `No Data Found between "${start_time}" and " ${end_time} ",  maybe No trip occurred during the given dates ` });
    }
    const tripcount = await models.trip.count({
      where: {
        travel_date: {
          [Op.lte]: end_time,
          [Op.gte]: start_time,
        },
        manager_id: id
      }
    });
    const approvedTrips = await models.trip.count({
      where: {
        travel_date: {
          [Op.lte]: end_time,
          [Op.gte]: start_time,
        },
        request_status: 'approved',
        manager_id: id
      }
    });
    const rejectedTrips = await models.trip.count({
      where: {
        travel_date: {
          [Op.lte]: end_time,
          [Op.gte]: start_time,
        },
        request_status: 'rejected',
        manager_id: id
      }
    });
    const pendingTrips = tripcount - (approvedTrips + rejectedTrips);
    return res.status(200).send({
      Date: new Date(),
      Report: `Dear "${`${userExist.firstName} ${userExist.lastName}`}" , from "${start_time}" to "${end_time}",  is the SUMMARY of trips you reacted on: `,
      tripNumber: tripcount,
      Pending: pendingTrips,
      Approved: approvedTrips,
      Rejected: rejectedTrips,
    });
  }
}