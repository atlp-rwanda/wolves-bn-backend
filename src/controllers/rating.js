/* eslint-disable class-methods-use-this */
import models from '../database/models';

const { accomodation, ratings } = models;

class Rating {
  async rating(req, res) {
    const {
      params: { acc_id },
      user: { id },
      body: { rating },
    } = req;

    return accomodation
      .findOne({ where: { id: acc_id } })
      .then(async (result) => {
        if (result) {
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
          .json({ status: 404, Error: 'accommodation not found' });
      })
      .catch((error) => res.status(500).json({ status: 500, message: error.message })
      );
  }
}

export default new Rating();
