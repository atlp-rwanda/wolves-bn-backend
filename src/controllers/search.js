import sequelize from 'sequelize';
import models from '../database/models';

const { Op } = sequelize;
const { trip } = models;

class Search {
  // eslint-disable-next-line class-methods-use-this
  searchEngine(req, res) {
    const {
      owner, destination, origin
    } = req.query;

    return trip.findAll({
      where: {
        [Op.or]: [{ requester_id: owner || null },
          { from: origin || null },
          { to: destination || null }]
      },
      include: [{
        model: models.users,
        as: 'requester'
      }, {
        model: models.location,
        as: 'departure'
      }, {
        model: models.location,
        as: 'destination'
      }]
    }).then(result => {
      if (result.length > 0) {
        return res.status(200).json({ message: 'Results successfully Found', result });
      }
      return res.status(404).json({ Error: 'no results found' });
    }).catch(error => res.status(500).json({ Error: 'Unexpected Error' }));
  }
}

export default new Search();
