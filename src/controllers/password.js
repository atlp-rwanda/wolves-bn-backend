/* eslint-disable class-methods-use-this */
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../database/models';
import { jwtToken } from '../utils/jwtToken';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_APIKEY);

class Password {
  async forgotPassword(req, res) {
    const { email } = req.body;
    const user = await models.users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        status: 404,
        Error: 'No account associated with this email found'
      });
    }

    const token = jwtToken.createToken(user.id, user.email);

    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: 'Password Reset Link',
      html: `
            <h2>Hello, <b>${user.firstName} ${user.lastName}</b></h2>
            <p>below is the link to reset your password</p>
            <a href=${process.env.URL}/api/users/resetPassword/${token}>Link</a>
            `,
    };

    await user.update({ resetLink: token });
    sgMail.send(msg).then(() => res.status(200).json({
      status: 200,
      Message: 'Check your email for the reset link'
    }));
  }

  async resetPassword(req, res) {
    const { newPassword } = req.body;
    jwt.verify(req.params.resetLinkToken, process.env.SECRET_OR_KEY, (err, decodeData) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          Error: 'Invalid or expired Token'
        });
      }
    });

    const user = await models.users.findOne({
      where: { resetLink: req.params.resetLinkToken }
    });
    if (!user) {
      return res.status(404).json({
        status: 404,
        Error: 'User with this reset link doesn\'t exist'
      });
    }

    await user.update({ password: newPassword, resetLink: '' });

    return res.status(200).json({
      status: 200,
      Message: 'Password changed Successfully'
    });
  }
}

export default new Password();
