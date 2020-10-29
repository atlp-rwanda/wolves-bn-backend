/* eslint-disable no-inner-declarations */
/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-sequences */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import models from '../database/models';

class Destination {
  async mostVisited(req, res) {
    try {
      const destinations = await models.destination.findAll();
      if (destinations) {
        const destinationsName = destinations.map((destObj) => destObj.name);
        const countOccurrences = arrO => arrO.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
        const destOcc = countOccurrences(destinationsName);
        function sortDestOcc(obj) {
          return Object.entries(obj).sort((a, b) => b[1] - a[1]);
        }
        const sortd = sortDestOcc(destOcc);
        const cities = {};
        for (let i = 0; i < 3; i++) {
          const city = sortd[i][0];
          const visitor = sortd[i][1];
          cities[city] = visitor;
        }
        res.send({
          cities
        });
      } else {
        res.status(404).send({
          status: '404',
          message: 'Destinations not found'
        });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default new Destination();
