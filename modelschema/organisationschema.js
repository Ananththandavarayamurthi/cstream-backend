// models/Organization.js
const mongoose = require('mongoose');

const organizationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim:true
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
    required: true,
    trim:true
  },
  numberOfEmployees: {
    type: Number,
    default: 0,
  },
  employees: [
    {_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    },
    name: {
      type: String,
      required: true,
    },
  },
  ],
});

 

module.exports = mongoose.model('Organization', organizationSchema);
