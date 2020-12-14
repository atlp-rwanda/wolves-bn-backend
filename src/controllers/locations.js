import models from '../database/models';

const { location, accomodation } = models;

class Location {
  async getLocations(req, res) {
    try {
      return location.findAll({

        include: [
            {
                model: accomodation,
                // as: 'accomodation'
            },
        ],
      }).then((locations) => {
        res.status(200).send(locations);
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default new Location();
