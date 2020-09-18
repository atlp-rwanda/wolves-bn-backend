import models from '../database/models';
import { hashPassowrd, jwtToken } from '../utils/jwtToken';

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
}
