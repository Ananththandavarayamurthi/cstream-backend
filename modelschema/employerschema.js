const mongoose=require("mongoose")

// Create Employee schema and model
const employeeSchema =  mongoose.Schema({
    name: String,
    dob: Date,
    phoneNumber: String,
    address: String,
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
    },
  });
  
 module.exports = mongoose.model('Employee', employeeSchema);