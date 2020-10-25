import models from '../database/models';
import emitter from '../helpers/events/eventEmitter';

const { trip, destination, location } = models;

module.exports = {
  updateTripRequest(req, res) {
    return trip
      .findOne({ where: { id: req.params.id } })
      .then(userRequest => {
        if (!userRequest) {
          return res.status(404).send({ message: 'request Not Found' });
        }
        const { id, role } = req.user;
        let status;
        // return userRequest.update({
        return trip.update({
          request_status: req.body.request_status,
        },
        { where: { id: req.params.id } }
        )
          .then(async (data) => {
            emitter.emit('request-status-updated', data);
            return res.status(200).send({ data, message: 'Request updated' });
          }).then(async () => {
            status = req.body.request_status;
            console.log('status: ', status);
            if (status === 'approved') {
              const approvedTrip = await trip.findOne({ where: { id } });
              const corrLocation = await location.findOne({ where: { id: approvedTrip.to } });
              return destination.create({
                to: approvedTrip.to,
                name: corrLocation.city
              }
              ).catch(err => res.status(400).send({ error: err }));
            }
          })
          .catch((error) => res.status(400).send(error));
      },
      ).catch(error => res.status(400).send(error));
  }
};
