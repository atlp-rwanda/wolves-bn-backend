// eslint-disable-next-line import/no-duplicates
import models from '../database/models';
import { jwtToken } from '../utils/jwtToken';

const { users } = models;
export default class UserAuth {
  static async authUser(req, res) {
    try {
      const {
        provider, name, emails, id
      } = req.user;
      const user = {
        firstName: name.givenName,
        lastName: name.familyName,
        email: emails[0].value,
        managerId: 1,
        role: 'requester'
      };
      if (provider === 'facebook') {
        users.findOrCreate({
          where: { fb_id: id },
          defaults: user,
        });
      }
      if (provider === 'google') {
        users.findOrCreate({
          where: { gl_id: id },
          defaults: {
            firstName: name.givenName,
            lastName: name.familyName,
            email: emails[0].value,
            role: 'requester'
          },
        });
      }

      const token = jwtToken.createToken({
        firstName: name.givenName,
        lastName: name.familyName,
        email: emails[0].value,
        managerId: 1,
        role: 'requester',
      });

      return res.status(200).send({ token });
    } catch (error) {
      return res.status(400);
    }
  }
}
