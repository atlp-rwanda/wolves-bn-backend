import { user } from '../database/models';
import { jwtToken } from '../utils/jwtToken';

export default class UserAuth {
  static async authUser(req, res) {
    try {
      console.log('req.user', req.user);
      const {
        provider, name, emails, id
      } = req.user;
      if (provider === 'facebook') {
        user.findOrCreate({
          where: { fb_id: id },
          defaults: {
            fname: name.givenName,
            lname: name.familyName,
            email: emails[0].value,
          },
        });
      } else if (provider === 'google') {
        user.findOrCreate({
          where: { gl_id: id },
          defaults: {
            fname: name.givenName,
            lname: name.familyName,
            email: emails[0].value,
          },
        });
      }

      const token = jwtToken.createToken({
        fname: name.givenName,
        lname: name.familyName,
        email: emails[0].value,
      });

      return res.status(200).send({ token });
    } catch (error) {
      return res.status(400);
    }
  }
}
