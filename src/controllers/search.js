import models from '../database/models';

const { trip, location, users } = models;

class Search {
  // eslint-disable-next-line class-methods-use-this
  searchEngine(req, res) {
    const {
      destination, departure
    } = req.query;

    let destinationId;
    let departureId;

    if (destination) {
      return location.findOne({
        returning: true,
        where: {
          city: destination
        }
      }).then(data => {
        destinationId = data.dataValues.id;

        return trip.findAll({
          where: {
            to: destinationId
          },
          include: [{
            model: users,
            as: 'requester',
            attributes: ['firstName', 'lastName']
          }, {
            model: location,
            as: 'departure',
            attributes: ['city']
          }, {
            model: location,
            as: 'destination',
            attributes: ['city']
          }],
          attributes: ['travel_type', 'return_date', 'travel_date', 'travel_reason']
        }).then(trips => {
          if (trips.length > 0) {
            return res.status(200).json({
              message: 'Results successfully Found',
              trips
            });
          }
          return res.status(200).json({ message: 'No trips related with this destination city found!' });
        }).catch(error => res.status(500).json({ Error: 'Unexpected Error' }));
      }).catch(err => res.status(404).json({ Error: 'No such Destination Found!' }));
    }

    if (departure) {
      return location.findOne({
        returning: true,
        where: {
          city: departure
        }
      }).then(data => {
        departureId = data.dataValues.id;

        return trip.findAll({
          where: {
            from: departureId
          },
          include: [{
            model: users,
            as: 'requester',
            attributes: ['firstName', 'lastName']
          }, {
            model: location,
            as: 'departure',
            attributes: ['city']
          }, {
            model: location,
            as: 'destination',
            attributes: ['city']
          }],
          attributes: ['travel_type', 'return_date', 'travel_date', 'travel_reason']
        }).then(trips => {
          if (trips.length > 0) {
            return res.status(200).json({
              message: 'Results successfully Found',
              trips
            });
          }
          return res.status(200).json({ message: 'No trips related with this departure city found!' });
        }).catch(error => res.status(400).json({ Error: 'Unexpected Error' }));
      }).catch(err => res.status(404).json({ Error: 'No such Departure Place Found!' }));
    }
  }
}

export default new Search();
