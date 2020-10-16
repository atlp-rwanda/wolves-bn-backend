import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
const BASEURL = process.env.BASEURL || 'localhost';
const PORT = process.env.PORT || 3000;
sgMail.setApiKey(process.env.SENDGRID_APIKEY);

// function to send email
let url;
const sendGridMail = (email, message) => {
  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: 'Trip',
    html: message
  };
  sgMail.send(msg);
};

export default sendGridMail;