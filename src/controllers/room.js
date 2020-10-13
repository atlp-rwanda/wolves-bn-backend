/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import models from '../database/models';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});
const { accomodation, users, room } = models;
class Room {
  async createRoom(req, res) {
    try {
      /**
     * step 1: Get the logged in user (id)
     * step 2: Verifying if the logged in user is travel admin
     * step 3: Deal with images using cloudinary
     * step 4: Create a room
     */
      const { id, role } = req.user;
      const findAccommodation = await accomodation.findOne({ where: { id: req.params.acc_id } });
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
          if (role === 'travel_admin') {
            if (findAccommodation) {
              room.create({
                type: req.body.type,
                price: req.body.price,
                accomodationId: req.params.acc_id,
                images: images.map(img => img.url)

              }, {
                include: [
                  {

                    model: accomodation,
                    as: 'accomodation'

                  }
                ]
              }).then((data) => {
                res.status(201).send(data);
              }).catch(err => {
                res.send({ err });
              });
            } else {
              res.send({ message: 'Accomodation was not found' });
            }
          } else {
            res.status(403).send({
              status: 403,
              message: 'Forbidden'
            });
          }
        });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async deleteRoom(req, res) {
    const findAccommodation = await accomodation.findOne({ where: { id: req.params.acc_id } });
    const findRoom = await room.findOne({ where: { id: req.params.room_id } });
    try {
      /**
       * Get the logged in user by Id
       * check if the logged in user is travel_admin
       * Find an accomodation by Id
       * Delete the accommodation with that Id
       */
      const { id, role } = req.user;
      const user = await users.findOne({ where: { id } });
      if (findAccommodation && findRoom) {
        if (role === 'travel_admin') {
          return room.destroy({ where: { id: room_id } }).then(data => {
            if (data) {
              res.status(200).send({
                status: 200,
                message: 'Room deleted successfully'
              });
            } else {
              res.status(404).send({
                status: 404,
                message: 'You are trying to delete non-existing room'
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
          message: 'Room not found'
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }
}
export default new Room();
