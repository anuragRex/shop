const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

// Handling GET Requests
router.get('/', (req, res, next)=>{
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
});

router.get('/:id', (req, res, next)=>{
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
});

// Handling POST requests
router.post('/', async (req, res, next)=>{
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
});

// Handling Delete Requests
router.delete('/:id', (req, res, next)=>{

   Order.deleteOne({ _id : req.params.id})
      .then(result => {
         if(result.deletedCount === 1){
            return res.json({
               result : "product deleted"
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
});

module.exports = router;