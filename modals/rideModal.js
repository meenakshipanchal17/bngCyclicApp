const mongoose = require('mongoose');

const rideSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true,'order name required']
    },
    email : {
        type : String,
        required : [true,'email is required']
    },
    userid : {
        type : String,
        // required : true
    },
    orderItems : [],
    shippingAddress : {
        type : Object,
        // required : true
    },
    orderAmount : {
        type : String,
        // required : true
    },
    isDelivered : {
        type : Boolean,
        default : false
    },
    transactionId : {
        type : String,
        // required : true
    }
},{timestamps : true})

module.exports = mongoose.model('ride',rideSchema);