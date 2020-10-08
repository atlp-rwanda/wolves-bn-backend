/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import models from '../database/models';
import Room from './room';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'nosenti',
  api_key: '496433573193378',
  api_secret: 'MaAH7UVltxv5cqm9V2ByflkhXjM'
});
const { accomodation, users, room } = models;

class Accommodation {
  async createAccommodation(req, res) {
    try {
      /**
     * step 1: Get the logged in user (id)
     * step 2: Verifying if the logged in user is travel admin
     * step 3: Deal with images using cloudinary
     * step 4: Create accommodation
     */
      const { id } = req.user;

      const user = await users.findOne({ where: { id } });
      let files;
      if (req.files != null) {
        files = req.files.photo;
      }

      const uploadImages = [];
      if (files) {
        if (Array.isArray(files)) {
          files.forEach((file) => {
            uploadImages.push(cloudinary.uploader.upload(file.tempFilePath));
          });
        } else {
          uploadImages.push(cloudinary.uploader.upload(files.tempFilePath));
        }
      }

      Promise.all(uploadImages)
        .then(images => {
          if (user.role === 'travel_admin') {
            accomodation.create({
              name: req.body.name,
              description: req.body.description,
              longitude: req.body.longitude,
              latitude: req.body.latitude,
              images: images.map(img => img.url),
              facilities: req.body.facilities
            }).then(data => res.send(data)).catch(err => {
              res.send({ err });
            });
          } else {
            res.status(400).send({
              status: '400',
              message: 'Unauthorized operation'
            });
          }
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  async editAccommodation(req, res) {
    const findAccommodation = await accomodation.findOne({ where: { id: req.params.acc_id } });
    try {
      /**
       * Get the logged in user by Id
       * check if the logged in user is travel_admin
       * Find an accomodation by Id
       * Deal with images with cloudinary
       * Edit the accomodation
       */
      const { id } = req.user;
      const user = await users.findOne({ where: { id } });
      if (findAccommodation) {
        if (user.role === 'travel_admin') {
          let files;
          if (req.files != null) {
            files = req.files.photo;
          }

          const uploadImages = [];
          if (files) {
            if (Array.isArray(files)) {
              files.forEach((file) => {
                uploadImages.push(cloudinary.uploader.upload(file.tempFilePath));
              });
            } else {
              uploadImages.push(cloudinary.uploader.upload(files.tempFilePath));
            }
          }
          Promise.all(uploadImages)
            .then(images => {
              accomodation.update({
                name: req.body.name,
                description: req.body.description,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                images: images.map(img => img.url),
                facilities: req.body.facilities
              }, {
                where: {
                  id: req.params.acc_id
                }
              }).then(res.status(200).send({
                status: '200',
                message: 'Accomodation is updated'
              })).catch(err => {
                res.send({ err });
              });
            });
        }
      } else {
        res.status(404).send({
          status: 404,
          message: 'Accommodation not found'
        });
      }
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  async deleteAccommodation(req, res) {
    const findAccommodation = await accomodation.findOne({ where: { id: req.params.acc_id } });
    try {
      /**
       * Get the logged in user by Id
       * check if the logged in user is travel_admin
       * Find an accomodation by Id
       * Delete the accommodation with that Id
       */
      const { id } = req.user;
      const user = await users.findOne({ where: { id } });
      if (findAccommodation) {
        if (user.role === 'travel_admin') {
          return accomodation.destroy({ where: { id: req.params.acc_id } }).then(data => {
            if (data) {
              res.status(200).send({
                status: 200,
                message: 'Accommodation deleted successfully'
              });
            } else {
              res.status(404).send({
                status: 404,
                message: 'You are trying to delete non-existing accommodation'
              });
            }
          }).catch(err => {
            console.log(err);
            res.status(409).send(err);
          });
        }
      } else {
        res.status(404).send({
          status: 404,
          message: 'Accommodation not found'
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }
}
Room.belongsTo(Accommodation, { onDelete: 'CASCADE' });
Accommodation.hasMany(Room);
export default new Accommodation();
