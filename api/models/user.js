const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
}));

module.exports = User;