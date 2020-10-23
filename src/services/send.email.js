import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

export default class SendingMail {
  static sendGridMail(email, message) {
    sgMail.setApiKey(process.env.SENDGRID_APIKEY);
    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: 'Trip Request',
      html: message
    };
    sgMail.send(msg)
      .then(() => {
        console.log('Email has been sent successfully');
      }).catch((err) => {
        console.log('Email hasn\'t been sent');
      });
  }
}
