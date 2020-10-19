/* eslint-disable class-methods-use-this */
import models from '../database/models';

const { accomodation, feedbacks } = models;

class Feedback {
  async feedback(req, res) {
    const {
      params: { acc_id },
      user: { id },
      body: { message },
    } = req;

    return accomodation
      .findOne({ where: { id: acc_id } })
      .then((result) => {
        if (result) {
          return feedbacks
            .create({
              userId: id,
              accomodationId: acc_id,
              message,
            })
            .then((response) => res
              .status(200)
              .json({ status: 200, message: 'feedback posted successfully' })
            );
        }

        return res
          .status(404)
          .json({ status: 404, Error: 'accommodation not found' });
      })
      .catch((error) => res.status(500).json({ status: 500, message: error.message })
      );
  }
}

export default new Feedback();
