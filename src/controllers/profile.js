import Sequelize from 'sequelize';
import models from '../database/models';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});
const { users } = models;

export default class Profile {
  static async getProfile(req, res) {
    const { id } = req.user;
    const profile = await users.findOne({ where: { id } });
    if (profile) {
      return res.status(200).send(profile);
    }
    return res.status(404).send({ message: 'User not found' });
  }

  static async updateProfile(req, res) {
    const { id } = req.user;

    const findUser = await users.findOne({ where: { id } });

    if (findUser) {
      if (findUser.id === id) {
        let files;
        if (req.files != null) {
          files = req.files.photo;
        }
        if (files.length > 1) {
          return res.status(400).send({
            status: 400,
            message: 'Only one picture should be uploaded'
          });
        }
        let file;
        if (files) {
          try {
            file = await cloudinary.uploader.upload(files.tempFilePath);
          } catch (error) {
            console.log(error);
            res.send(error);
          }
        }

        await users.update({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
          gender: req.body.gender,
          language: req.body.language,
          currency: req.body.currency,
          address: req.body.address,
          birthdate: req.body.birthdate,
          department: req.body.department,
          profileimage: file.url,
        },
        {
          where: {
            id
          }
        }).then(async (data) => res.status(200).send({
          data,
          status: '200',
          message: 'Profile is updated'
        })).catch(err => {
          console.log(err);
          res.send({ error: err });
        });
      } else {
        return res.status(403).send({
          status: 403,
          message: 'Unauthorized access'
        });
      }
    } else {
      return res.status(404).status({
        status: 404,
        message: 'User not found'
      });
    }
  }
}
