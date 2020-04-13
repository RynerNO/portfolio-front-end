"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Project = _interopRequireDefault(require("../../models/Project"));

var _fs = _interopRequireDefault(require("fs"));

var _unzipper = _interopRequireDefault(require("unzipper"));

var _express = _interopRequireDefault(require("express"));

var getProjects =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var projects;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _Project["default"])().find();

          case 2:
            projects = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              projects: projects
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getProjects(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var addProject =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, projectName, projectTech, projectType, projectDuration, imageName, archive;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, projectName = _req$body.projectName, projectTech = _req$body.projectTech, projectType = _req$body.projectType, projectDuration = _req$body.projectDuration;
            imageName = req.files['projectImage'][0];
            archive = req.files['projectArchive'][0];

            if (process.NODE_ENV !== 'production') {
              _fs["default"].createReadStream('./dist/public/site_preview/' + archive.filename).pipe(_unzipper["default"].Extract({
                path: './dist/public/site_preview/' + projectName.toLowerCase().replace(' ', '_')
              })).on('close', function () {
                _fs["default"].unlink('./dist/public/site_preview/' + archive.filename, function (err) {
                  return;
                });
              });
            } else {
              _fs["default"].createReadStream('/../../public/site_preview/' + archive.filename).pipe(_unzipper["default"].Extract({
                path: '/../../public/site_preview/' + projectName.toLowerCase().replace(' ', '_')
              })).on('close', function () {
                _fs["default"].unlink('/../../public/site_preview/' + archive.filename, function (err) {
                  return;
                });
              });
            }

            _context2.next = 6;
            return (0, _Project["default"])().create({
              name: projectName,
              tech: projectTech,
              type: projectType,
              duration: projectDuration,
              imageName: imageName.filename
            });

          case 6:
            return _context2.abrupt("return", res.status(200).json({
              message: 'Successfully added project'
            }));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function addProject(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  getProjects: getProjects,
  addProject: addProject
};
exports["default"] = _default;