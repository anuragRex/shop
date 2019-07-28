const mongoose = require('mongoose');

const Product = mongoose.model('Product', new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    price : Number
}));

module.exports = Product;