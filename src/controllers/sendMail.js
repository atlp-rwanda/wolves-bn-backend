import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
const BASEURL = process.env.BASEURL || 'localhost';
const PORT = process.env.PORT || 3000;
sgMail.setApiKey(process.env.SENDGRID_APIKEY);

// function to send emai
let url;
const sendingMail = (emailAddres) => {
  url = `http://${BASEURL}:${PORT}/user/confirmation/${emailAddres}`;
  const msg = {
    to: emailAddres,
    from: process.env.SENDER_EMAIL,
    subject: 'Barefoot Email Verfication',
    html: `<p>Please comfirm Your Email by: <a href="${url}">Click here please</a></p>`
  };
  sgMail.send(msg);
};

export default sendingMail;
