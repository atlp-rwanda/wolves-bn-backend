import models from '../database/models';
import { jwtToken } from '../utils/jwtToken';

const { users } = models;
export default class UserAuth {
  static async authUser(req, res) {
    try {
      console.log('req.users', req.users);
      const {
        provider, name, emails, id
      } = req.users;
      if (provider === 'facebook') {
        users.findOrCreate({
          where: { fb_id: id },
          defaults: {
            firstName: name.givenName,
            lastName: name.familyName,
            email: emails[0].value,
          },
        });
      } else if (provider === 'google') {
        users.findOrCreate({
          where: { gl_id: id },
          defaults: {
            firstName: name.givenName,
            lastName: name.familyName,
            email: emails[0].value,
          },
        });
      }

      const token = jwtToken.createToken({
        firstName: name.givenName,
        lastName: name.familyName,
        email: emails[0].value,
      });

      return res.status(200).send({ token });
    } catch (error) {
      return res.status(400);
    }
  }
}
