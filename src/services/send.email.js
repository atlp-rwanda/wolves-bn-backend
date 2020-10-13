import sgMail from '@sendgrid/mail';

class SendMail {
  static sendGridEmail(email, emailBody) {
    sgMail.setApiKey(process.env.SENDGRID_APIKEY);
    const msg = {
      to: `${email}`,
      from: process.env.SENDER_EMAIL,
      subject: 'Trip Notification',
      html: `${emailBody}`
    };
    const message = {
      ...msg,
    };
    sgMail.send(message);
  }
}

export default SendMail;