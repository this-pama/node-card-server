'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var licenceSchema = new Schema({
  fullName: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: false
  },
  serial: {
    type: String,
    required: false
  },
  imei: {
    type: String,
    required: false
  },
  phoneSerial: String,
  licenceKey: String,
  email: String,
  count: Number
});

module.exports = _mongoose2.default.model('Licence', licenceSchema);
//# sourceMappingURL=licence.js.map