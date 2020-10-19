import models from '../database/models';
import emitter from '../helpers/events/eventEmitter';

const { trip } = models;

module.exports = {
  updateTripRequest(req, res) {
    return trip
      .findOne({ where: { id: req.params.id } })
      .then(userRequest => {
        if (!userRequest) {
          return res.status(404).send({ message: 'request Not Found' });
        }
        const { id, role } = req.user;
        return trip.update({
          request_status: req.body.request_status,
          manager_id: id,
          manager_role: role
        },
        { where: { id: req.params.id } }
        )
          .then((data) => {
            res.status(200).send({ data, message: 'Request updated' });
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  }
};
