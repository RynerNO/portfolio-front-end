'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;

var _express = require('express');

var _auth = _interopRequireDefault(
  require('../../controllers/v1/auth.controller')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var authRouter = new _express.Router();
authRouter.post('/login', _auth['default'].login);
authRouter.post('/register', _auth['default'].register);
var _default = authRouter;
exports['default'] = _default;
