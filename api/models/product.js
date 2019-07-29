const mongoose = require('mongoose');

const Product = mongoose.model('Product', new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    }
}));

module.exports = Product;