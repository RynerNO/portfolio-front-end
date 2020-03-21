'use strict';

var _express = _interopRequireDefault(require('express'));

var _mongoose = _interopRequireDefault(require('mongoose'));

var _config = _interopRequireDefault(require('./config'));

var _routes = _interopRequireDefault(require('./routes'));

var _webpack = _interopRequireDefault(require('webpack'));

var _webpack2 = _interopRequireDefault(require('../webpack.config'));

var _webpackDevMiddleware = _interopRequireDefault(
  require('webpack-dev-middleware')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_mongoose['default'].connect(_config['default'].databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var app = (0, _express['default'])();
var compiler = (0, _webpack['default'])(_webpack2['default']);
app.use((0, _webpackDevMiddleware['default'])(compiler));
app.listen(3000, function() {
  console.log('run');
});
