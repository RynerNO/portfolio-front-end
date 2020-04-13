"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Yup = _interopRequireWildcard(require("yup"));

var SUPPORTED_IMAGE_FROMATS = ['image/jpg', 'image/jpeg', 'image/png'];
var newProjectSchema = Yup.object().shape({
  projectType: Yup.string().required(),
  projectDuration: Yup.string().required(),
  projectName: Yup.string().required(),
  projectTech: Yup.string().required(),
  projectImage: Yup.mixed().required().test('fileFormat', 'Image only', function (value) {
    return SUPPORTED_IMAGE_FROMATS.includes(value.type);
  }),
  projectArchive: Yup.mixed().required().test('fileFormat', 'Image only', function (value) {
    console.log(value);
  })
});

var _default = function _default(req, res, next) {
  console.log(JSON.stringify(req.body));
  newProjectSchema.validate(req.body).then(function () {
    return true;
  })["catch"](function (error) {
    console.log(error);
    res.status(422).json((0, _defineProperty2["default"])({}, error.path, error.message));
  });
};

exports["default"] = _default;