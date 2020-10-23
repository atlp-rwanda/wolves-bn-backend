/* eslint-disable class-methods-use-this */
import models from '../database/models';

const { accomodation, like } = models;

class Like {
  async likeOrUnlike(req, res) {
    const {
      params: { acc_id },
      user: { id },
    } = req;

    return accomodation
      .findOne({ where: { id: acc_id } })
      .then(async (result) => {
        if (result) {
          const liked = await like.findOne({
            where: { userId: id, accomodationId: acc_id },
          });
          const isLike = {
            userId: id,
            accomodationId: acc_id,
          };

          if (!liked) {
            return like
              .create(isLike)
              .then((response) => res
                .status(200)
                .json({ status: 200, message: 'Liked' })
              );
          }

          return like
            .destroy({ where: { userId: id, accomodationId: acc_id } })
            .then((response) => res
              .status(200)
              .json({ status: 200, message: 'unliked' })
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

export default new Like();
