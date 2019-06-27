'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var retailerLicenceSchema = new Schema({
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
    required: true
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

module.exports = mongoose.model('RetailerLicence', retailerLicenceSchema);
//# sourceMappingURL=retailerLicence.js.map