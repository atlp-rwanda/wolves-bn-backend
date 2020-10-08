/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import models from '../database/models';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'nosenti',
  api_key: '496433573193378',
  api_secret: 'MaAH7UVltxv5cqm9V2ByflkhXjM'
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
            room.create({
              type: req.body.type,
              price: req.body.price,
              accomodationId: req.body.accomodationId,
              images: images.map(img => img.url)

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
}
export default new Room();

