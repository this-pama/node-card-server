'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _cpLicence = require('../model/cpLicence');

var _cpLicence2 = _interopRequireDefault(_cpLicence);

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

  // '/v1/user' - GET all users
  api.get('/', function (req, res) {
    _cpLicence2.default.find({}, function (err, users) {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  });

  // '/v1/licence/:serial' - GET a specific user 
  api.get('/:serial', function (req, res) {
    _cpLicence2.default.find({ serial: req.params.serial }, function (err, user) {
      if (err) {
        console.log(err);
      }
      res.json(user);
    });
  });

  // '/v1/licence' - POST - update a user  
  api.put('/licence', function (req, res) {
    _cpLicence2.default.find({ serial: req.body.serial }, function (err, user) {
      if (err) {
        console.log(err);
      }
      console.log(user, 'first user');
      try {

        if (user[0].username === req.body.username) {
          if (user[0].imei === req.body.imei || user[0].phoneSerial === req.body.phoneSerial) {
            res.json({ message: 'This serial number is for a single device' });
          } else {
            //generate reference number
            var ref = randomize('a', 20);

            var update = {
              "count": 1,
              "phoneSerial": req.body.phoneSerial,
              "licenceKey": ref,
              "imei": req.body.imei
            };

            var id = user[0]._id;
            _cpLicence2.default.findByIdAndUpdate(id, update, function (err, user) {
              if (err) {
                console.log(err);
              }
              console.log(user.licenceKey, " second user");
              // send notification email to buyer
              var email = user.email;
              var mailOptions = {
                from: 'noreplySale@jyqwinslimited.com',
                to: email,
                subject: 'Confirmation of Device Activation',
                html: '<h1>Hello </h1><p>This is to confirm the payment for your device activation. Thank you.</p><p>Contact us on +234 816 787 6460 for any enquiry.</p>'
              };
              transporter.sendMail(mailOptions);
              return res.json({ licenceKey: '' + ref });
            });
          }
        } else {
          res.json({ message: 'User does not exist' });
        }
      } catch (err) {
        res.json({ message: 'User does not exist' });
      }
    });
  });

  // '/v1/licence/add' - POST - add a serial 
  api.post('/add', function (req, res) {

    // create user profile
    var newLicence = new _cpLicence2.default();
    newLicence.username = req.body.username;
    newLicence.serial = req.body.serial;
    newLicence.email = req.body.email;

    newLicence.save(function (err, user) {
      if (err) {
        console.log(err);
      }
      // send notification email to buyer
      var email = req.body.email;
      console.log(email);
      var mailOptions = {
        from: 'noreplySale@jyqwinslimited.com',
        to: email,
        subject: 'Here is your Licence Serial Number!',
        html: '<h3>Dear Valued Customer </h3><p>Thank you for getting in touch with us. We have received your request for a licence. One of our team will get in touch with you soon.</p><p>You can also Contact us on +234 816 787 6460 for any enquiry.</p><p> Many Thanks</p>'

        // send mail with defined transport object
      };transporter.sendMail(mailOptions);
      res.json({ serial: '' + user.serial });
    });
  });
  return api;
};
//# sourceMappingURL=cpLicence.js.map