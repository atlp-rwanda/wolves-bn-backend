/* eslint-disable class-methods-use-this */
import models from '../database/models';

const { ratings, trip } = models;

class Rating {
  async rating(req, res) {
    const {
      params: { acc_id },
      user: { id },
      body: { rating },
    } = req;

    const findTrip = await trip.findOne({ where: { accommodation: acc_id, request_status: 'approved' } });

    if (findTrip) {
      const isRated = await ratings.findOne({
        where: { userId: id, accomodationId: acc_id },
      });

      if (!isRated) {
        return ratings
          .create({
            userId: id,
            accomodationId: acc_id,
            rating
          })
          .then((response) => res
            .status(200)
            .json({ status: 200, message: 'Rated successfully' })
          );
      }

      await ratings.update({ rating },
        {
          where: { userId: id, accomodationId: acc_id },
          returning: true,
        }
      );
      return res
        .status(200)
        .json({ status: 200, message: 'Rated Again Successfully' });
    }
    return res
      .status(404)
      .json({ status: 404, Error: 'you can\'t rate on an accommodation didn\'t stay in' });
  }
}

export default new Rating();
