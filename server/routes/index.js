import { Router } from 'express';

import authRouter from './v1/auth';

import projectsRouter from './v1/projects'

import messageValidator from '@validators/messageValidator'

import nodemailer from 'nodemailer';
import { google } from 'googleapis'
const OAuth2 = google.auth.OAuth2;
const v1Router = new Router();
const oauth2Client = new OAuth2(
  "***REMOVED***", // ClientID
  "***REMOVED***", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
  refresh_token: "***REMOVED***"
});

v1Router.use('/api/v1/auth', authRouter);
v1Router.use('/api/v1/projects', projectsRouter);
v1Router.post('/api/v1/sendMessage', messageValidator, function (req, res) {
  const accessToken = oauth2Client.getAccessToken()
  let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
       type: 'OAuth2',
       user: '***REMOVED***',
      clientId: '***REMOVED***',
      clientSecret: '***REMOVED***',
      refreshToken: '***REMOVED***',
      accessToken: accessToken
      
    }
  });
  const message = {
    from: '***REMOVED***',
    to: '***REMOVED***',         
    subject: 'Portfolio Site Mail', 
    html: `
    <h2>From: <b>${req.body.email}</b></h2>
    <h2>Name: <b>${req.body.name}</b></h2>
    <p>Messasge: ${req.body.text}</p>`
};
transport.sendMail(message, function(err, info) {
    if (err) {
      res.status(422).json({
        err
      })
    } else {
      res.status(200).json({
        'status': 'success',
      })
    }
});
})
export default v1Router;
