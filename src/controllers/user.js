/* eslint-disable import/no-unresolved */
import redis from 'redis';
import sendingMail from './sendMail';
import models from '../database/models';
import { hashPassowrd, comparePassword, jwtToken } from '../utils/jwtToken';

const { users, preferences } = models;
export const redisclient = redis.createClient();
export default class User {
  static async signup(req, res) {
    try {
      const {
        firstName,
        lastName,
        phone,
        email,
        password
      } = req.body;
      const existUser = await users.findOne({ where: { email: req.body.email } });
      if (existUser) {
        return res.status(409).json({
          message: 'user already exists'
        });
      }
      const hash = hashPassowrd(password);
      const user = await users.create({
        firstName,
        lastName,
        phone,
        role: 'requester',
        email,
        password: hash,
        manager_id: 2
      });
      await preferences.create({
        requester_id: user.id,
        emailnotification: true,
        appnotification: true
      });
      const userId = user.id;
      const token = jwtToken.createToken(user);
      const messaging = sendingMail(user.email);
      return res.status(201).send({
        token,
        user: {
          firstName, lastName, email
        },
        messaging,
        message: 'Please you may go confirm in your email'
      });
    } catch (error) {
      return res.status(500).send(console.log(error));
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await users.findOne({ where: { email } });
      if (!user) return res.status(400).send({ status: 400, error: "User doesn't exist" });
      if (user && comparePassword(password, user.password)) {
        const token = jwtToken.createToken(user);
        return res.status(200).send({ token, user });
      }
      return res.status(400).send({ status: 400, error: 'invalid email/password combination ' });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async getProfile(req, res) {
    const { id } = req.params;
    const profile = await users.findOne({ where: { id } });
    if (profile) {
      return res.status(200).send(profile);
    }
    return res.status(404).send({ message: 'User not found' });
  }

  static async updateProfile(req, res) {
    const { id } = req.user;
    const {
      firstName,
      lastName,
      phone,
      email,
      gender,
      birthdate,
      language,
      currency,
      address,
      role,
      department,
      manager,
      profileimage
    } = req.body;
    const findUser = await users.findOne({ where: { id } });
    if (findUser) {
      const updatedUser = await users.update({
        firstName,
        lastName,
        phone,
        email,
        gender,
        birthdate,
        language,
        currency,
        address,
        role,
        department,
        manager,
        profileimage
      }, {
        where: {
          id
        }
      }).then((data) => {
        if (data[0] > 0) {
          return res.status(200).send({ status: 200, message: 'User profile updated' });
        } return res.status(404).send({ message: 'Bad request' });
      }).catch((err) => {
        res.status(500).send({ err });
      });
    }
  }

  static updateUser(req, res) {
    return users
      .findOne({ where: { email: req.params.email } })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        return user
          .update({
            confirmed: true
          })
          .then(() => res.status(200).send({ message: 'User confirmed' }));
      });
  }

  static async logout(req, res) {
    const token = req.header('token');
    redisclient.set(token, 1);
    return res.status(200).send({ message: 'User Loged out' });
  }
}
