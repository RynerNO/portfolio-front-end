
import config from '@config'
import nodemailer from 'nodemailer';
import { google } from 'googleapis'


const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  config.clientID, // ClientID
  config.clientSecret, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
  refresh_token: config.refreshToken
});

const send = (req, res) => {
  const accessToken = oauth2Client.getAccessToken()
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
       type: 'OAuth2',
       user: config.mailFrom,
      clientId: config.clientID,
      clientSecret: config.clientSecret,
      refreshToken: config.refreshToken,
      accessToken: accessToken
      
    }
  });
  const message = {
    from: config.mailFrom,
    to: config.mailTo,         
    subject: 'Portfolio Site Mail', 
    html: `   
    <style>
      a {
        text-decoration: none;
        color: #072d5e;
      }
    </style>
    <h2 style="font-size: 19px; color: #072d5e;">From: ${req.body.email}</h2>
    <h2 style="font-size: 19px; color: #072d5e;">Name: ${req.body.name}</h2>
    <p style="font-size: 18px; #072d5e;">Messasge: ${req.body.text}</p>
    `
};
  transport.sendMail(message, function (err, info) {
  if (err) {
      console.error(err);
      res.status(422).json({
        error: err.message
      })
    } else {
      res.status(200).json({
        'status': 'success',
      })
    }
});
}
export default {
  send
}