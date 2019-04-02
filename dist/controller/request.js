'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _request = require('../model/request');

var _request2 = _interopRequireDefault(_request);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var randomize = require('randomatic');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'adedapopaul@gmail.com',
    pass: 'moronkeji'
  }
});

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // '/v1/request' - GET all request
  api.get('/', function (req, res) {
    _request2.default.find({}, function (err, users) {
      if (err) {
        console.log(err);
      }
      res.json(users);
    });
  });

  // '/v1/request/:name' - GET a specific user request
  api.get('/:name', function (req, res) {
    _request2.default.find({ name: req.params.name }, function (err, user) {
      if (err) {
        console.log(err);
      }
      res.json(user);
    });
  });

  // '/v1/request' - POST - update a user  
  api.post('/request', function (req, res) {

    // create user profile
    var newRequest = new _request2.default();
    newRequest.name = req.body.name;
    newRequest.username = req.body.username;
    newRequest.device = req.body.device;
    newRequest.phone = req.body.phone;
    newRequest.email = req.body.email;
    newRequest.address = req.body.address;

    newRequest.save(function (err, user) {
      if (err) {
        console.log(err);
      }
      // send notification email to buyer
      var email = req.body.email;
      console.log(email);
      var mailOptions = {
        from: 'noreplySale@jyqwinslimited.com',
        to: email,
        subject: 'You are Welcome!',
        html: '<h3>Dear Valued Customer </h3><p>Thank you for getting in touch with us. We have received your request for a licence. One of our team will get in touch with you soon.</p><p>You can also Contact us on +234 816 787 6460 for any enquiry.</p><p> Many Thanks</p>'

        // send mail with defined transport object
      };transporter.sendMail(mailOptions);
      res.json({ message: 'Request has been sent' });
    });
  });

  return api;
};
//# sourceMappingURL=request.js.map