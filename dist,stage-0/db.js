'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (callback) {
  var db = _mongoose2.default.connect('mongodb://mongo:27017/card-server-restful-api', { useMongoClient: true }).then(function () {
    return console.log('MongoDb connected');
  }).catch(function (err) {
    return console.log(err);
  });
  callback(db);
};
//# sourceMappingURL=db.js.map