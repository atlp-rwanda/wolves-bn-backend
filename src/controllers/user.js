import models from '../database/models';
import { hashPassowrd, comparePassword, jwtToken } from '../utils/jwtToken';

export default class User {
  static async signup(req, res) {
    try {
      const {
        fname,
        lname,
        phone,
        email,
        password
      } = req.body;
      const existUser = await models.user.findOne({ where: { email: req.body.email } });
      if (existUser) {
        return res.json({
          message: 'user already exitsts'
        });
      }
      const hash = hashPassowrd(password);
      const user = await models.user.create({
        fname,
        lname,
        phone,
        email,
        password: hash
      });
      const token = jwtToken.createToken(user);
      return res.status(201).send({ token, user: { fname, lname, email } });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await models.user.findOne({ where: { email } });
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
}
