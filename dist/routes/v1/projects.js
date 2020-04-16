"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _auth = _interopRequireDefault(require("../../middleware/auth"));

var _path = _interopRequireDefault(require("path"));

var _projects = _interopRequireDefault(require("../../controllers/v1/projects.controller"));

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    if (process.NODE_ENV !== 'production') {
      cb(null, _path["default"].resolve('dist', 'public/site_preview/'));
    } else {
      cb(null, _path["default"].resolve('./', 'public/site_preview/'));
    }
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + _path["default"].extname(file.originalname)); //Appending extension
  }
});

var upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: function fileFilter(req, file, cb) {
    if (file.fieldname === "projectImage" && (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg")) {
      cb(null, true);
    } else if (file.fieldname === "projectArchive" && file.mimetype === "application/x-zip-compressed") {
      cb(null, true);
    } else {
      cb(new Error('Unsupported format'), false);
    }
  }
});
var router = new _express.Router();
router.get('/get', _projects["default"].getProjects);
router.post('/add', _auth["default"], upload.fields([{
  name: 'projectImage',
  maxCount: 1
}, {
  name: 'projectArchive',
  maxCount: 1
}]), _projects["default"].addProject);
var _default = router;
exports["default"] = _default;