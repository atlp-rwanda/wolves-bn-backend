import sendingMail from './sendMail';
import models from '../database/models';
import { hashPassowrd, comparePassword, jwtToken } from '../utils/jwtToken';

const { users } = models;
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
        return res.json({
          message: 'user already exists'
        });
      }
      const hash = hashPassowrd(password);
      const user = await users.create({
        firstName,
        lastName,
        phone,
        email,
        password: hash
      });
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
      return res.status(500).send(error);
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await users.findOne({ where: { email } });
      if (!user) return res.status(400).send({ status: 400, error: "User doesn't exist" });
      if (user && comparePassword(password, user.password)) {
        const token = jwtToken.createToken(user);
        return res.status(200).send({ token });
      }
      return res.status(400).send({ status: 400, error: 'invalid email/password combination ' });
    } catch (error) {
      return res.status(500).send(error);
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
}
