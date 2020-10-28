import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
const BASEURL = process.env.BASEURL || 'localhost';
const PORT = process.env.PORT || 5000;
sgMail.setApiKey(process.env.SENDGRID_APIKEY);

// function to send email
let url;
const sendingMail = (emailAddress) => {
  url = `http://${BASEURL}:${PORT}/api/users/signin`;
  const msg = {
    to: emailAddress,
    from: process.env.SENDER_EMAIL,
    subject: 'Barefoot Email Verfication',
    html: `<p>Please confirm Your Email by: <a href="${url}">Click here please</a></p>`
  };
  sgMail.send(msg)
    .then(() => {
      console.log('Email Sent');
    }).catch(err => {
      // console.log('Email not sent');
      console.log(err);
    });
};

export default sendingMail;
