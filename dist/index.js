"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

var _routes = _interopRequireDefault(require("./routes"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _compression = _interopRequireDefault(require("compression"));

var _cors = _interopRequireDefault(require("cors"));

_mongoose["default"].connect(_config["default"].databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use((0, _cors["default"])());
app.use((0, _compression["default"])());
app.use(_routes["default"]);
app.use(_express["default"]["static"](_path["default"].resolve(__dirname, 'public')));
app.get('*', function (req, res) {
  res.sendFile(_path["default"].resolve(__dirname, 'public/index.html'));
});
app.listen(3000, function () {
  console.log('run');
});