import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let RequestSchema = new Schema({
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
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  }
  
});

module.exports = mongoose.model('Request', RequestSchema);
