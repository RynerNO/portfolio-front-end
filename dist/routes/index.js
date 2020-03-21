'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;

var _express = require('express');

var _auth = _interopRequireDefault(require('./v1/auth'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var v1Router = new _express.Router();
v1Router.use('api/v1/auth', _auth['default']);
var _default = v1Router;
exports['default'] = _default;
