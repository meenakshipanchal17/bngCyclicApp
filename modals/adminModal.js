const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    
    officialname : {
        type : String,
        required :  [true,'Name Is Required']
    },
    password : {
        type : String,
        required :[true,'Password Is Required']
    },
    
    officialemail: {
        type : String,
        required : [true,'Email Is Required']
    },
     
},{timestamps : true});

module.exports = mongoose.model('admin',adminSchema);
 