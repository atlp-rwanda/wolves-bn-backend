/* eslint-disable class-methods-use-this */
import models from '../database/models';

const { feedbacks, trip } = models;

class Feedback {
  async feedback(req, res) {
    const {
      params: { acc_id },
      user: { id },
      body: { message },
    } = req;

    const findTrip = await trip.findOne({ where: { accommodation: acc_id, request_status: 'approved' } });

    if (findTrip) {
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
      .status(400)
      .json({ status: 400, Error: 'you can\'t comment on an accommodation didn\'t stay in' });
  }
}

export default new Feedback();
