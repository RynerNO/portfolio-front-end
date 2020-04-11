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
    cb(null, './server/public/site_preview/');
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + _path["default"].extname(file.originalname)); //Appending extension
  }
});

var upload = (0, _multer["default"])({
  storage: storage
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