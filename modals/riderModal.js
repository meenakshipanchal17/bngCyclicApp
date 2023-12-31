const mongoose = require('mongoose');

const riderSchema = mongoose.Schema({
    riderName : {
        type : String,
        required : [true,'Name Is Required']
    },
   
    riderEmail : {
        type : String,
        required : [true,'Email Is Required']
    },

    riderPhone : {
        type : Number,
        required : [true,'Phone number Is Required']
    },

    riderGender: {
        type: String,
        enum: ['female', 'male', 'other'],
        required: [true, 'Gender is required']
    },

    riderPassword : {
        type : String,
        required : [true,'Password Is Required']
    },
    riderImage : {
        type : String,
        default : false
    }
},{timeStamps : true})

module.exports = mongoose.model('Rider',riderSchema);


