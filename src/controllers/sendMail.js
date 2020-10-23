import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
const BASEURL = process.env.BASEURL || 'localhost';
const PORT = process.env.PORT || 3000;
sgMail.setApiKey(process.env.SENDGRID_APIKEY);

// function to send email
let url;
const sendingMail = (emailAddress) => {
  url = `http://${BASEURL}:${PORT}/user/confirmation/${emailAddress}`;
  const msg = {
    to: emailAddress,
    from: process.env.SENDER_EMAIL,
    subject: 'Barefoot Email Verfication',
    html: `<p>Please comfirm Your Email by: <a href="${url}">Click here please</a></p>`
  };
  sgMail.send(msg)
    .then(() => {
      console.log('Email Sent');
    }).catch(err => {
      console.log('Email not sent');
    });
};

export default sendingMail;
