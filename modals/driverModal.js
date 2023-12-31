const mongoose = require("mongoose");

const  driverSchema = mongoose.Schema(
  {
    DriverName : {
        type : String,
        required : [true,'Name Is Required']
    },
   
    DriverEmail : {
        type : String,
        required : [true,'Email Is Required']
    },
    DriverPhone : {
        type : Number,
        required : [true,'Phone number Is Required']
    },
    DriverLicenceNumber:{
        type : String,
        required : [true,'Licence Number Is Required']
    },

    DriverPassword : {
        type : String,
        required : [true,'Password Is Required']
    },
    DriverGender: {
        type: String,
        enum: ['female', 'male', 'other'],
        required: [true, 'Gender is required']
    }
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
