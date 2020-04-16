"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./v1/auth"));

var _projects = _interopRequireDefault(require("./v1/projects"));

var _messageValidator = _interopRequireDefault(require("../validators/messageValidator"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _googleapis = require("googleapis");

var OAuth2 = _googleapis.google.auth.OAuth2;
var v1Router = new _express.Router();
var oauth2Client = new OAuth2("***REMOVED***", // ClientID
"***REMOVED***", // Client Secret
"https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
  refresh_token: "***REMOVED***"
});
v1Router.use('/api/v1/auth', _auth["default"]);
v1Router.use('/api/v1/projects', _projects["default"]);
v1Router.post('/api/v1/sendMessage', _messageValidator["default"], function (req, res) {
  var accessToken = oauth2Client.getAccessToken();

  var transport = _nodemailer["default"].createTransport({
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

  var message = {
    from: '***REMOVED***',
    to: '***REMOVED***',
    subject: 'Portfolio Site Mail',
    html: "\n    <h2>From: <b>".concat(req.body.email, "</b></h2>\n    <h2>Name: <b>").concat(req.body.name, "</b></h2>\n    <p>Messasge: ").concat(req.body.text, "</p>")
  };
  transport.sendMail(message, function (err, info) {
    if (err) {
      res.status(422).json({
        err: err
      });
    } else {
      res.status(200).json({
        'status': 'success'
      });
    }
  });
});
var _default = v1Router;
exports["default"] = _default;