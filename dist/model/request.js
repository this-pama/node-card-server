'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var RequestSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: false
  },
  device: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  }

});

module.exports = _mongoose2.default.model('Request', RequestSchema);
//# sourceMappingURL=request.js.map