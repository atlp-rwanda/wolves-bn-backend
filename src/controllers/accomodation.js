import models from '../database/models';

const { accomodation } = models;

class Accomodation {
  static async createAccomodation(req, res) {
    const {
      name, description, longitude, latitude, images, facilities, hostId
    } = req.body;
  }
}

export default new Accomodation();