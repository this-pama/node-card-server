'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trialSchema = new Schema({
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

module.exports = mongoose.model('TrialLicence', trialSchema);
//# sourceMappingURL=trialLicence.js.map