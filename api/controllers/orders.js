const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.orders_get_all = (req, res, next)=>{
    Order.find()
       .select('-__v')
       .populate('product', 'name price')
       .then(docs => {
          res.json({
             count : docs.length,
             orders : docs
          });
       })
       .catch(err => {
          res.status(501).json({
             message : "something went wrong",
             error : `${err.name} : ${err.message}`
          });
       });
};

exports.orders_get_one = (req, res, next)=>{
    const id = req.params.id;
    Order.findById(id)
       .select('-__v')
       .populate('product', 'name price')
       .then(doc => {
          if(!doc){
             return res.status(404).json({
                message : "order not found"
             });
          }
          res.json({
             order : doc
          });
       })
       .catch(err => {
          res.status(501).json({
             message : "something went wrong",
             error : `${err.name} : ${err.message}`
          });
       });
};

exports.orders_create_order = async (req, res, next)=>{
   try{
      const product = await Product.findById(req.body.productId);

      if(!product){
         return res.status(404).json({
            message : "product not found"
         });
      }
      
      const order = new Order({
         _id : mongoose.Types.ObjectId(),
         product : req.body.productId,
         quantity : req.body.quantity
      });

      const result = await order.save()
      
      res.status(201).json({
         message : "order placed successfully",
         result,
         product : product.name
      }); 
   }
   catch(err){
      res.status(501).json({
         message : "something went wrong",
         error : `${err.name} : ${err.message}`
      });
   }      
};

exports.orders_delete_order = (req, res, next)=>{

   Order.deleteOne({ _id : req.params.id})
      .then(result => {
         if(result.deletedCount === 1){
            return res.json({
               result : "order deleted"
            });
         }
         res.status(404).json({
            message : 'order not found'
         });
      })
      .catch(err => {
         res.status(500).json({
            message : "something went wrong",
            error : `${err.name} : ${err.message}`
         });
      });
};