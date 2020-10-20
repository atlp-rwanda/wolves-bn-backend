import models from '../database/models';

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
        console.log(req.user);
        console.log('This is users here!');
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
