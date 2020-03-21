'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;

var _dotenv = _interopRequireDefault(require('dotenv'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_dotenv['default'].config();

var _default = {
  databaseUrl: process.env.DATABASE_URL
};
exports['default'] = _default;
