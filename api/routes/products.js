const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

// GET ROUTES

router.get('/', (req, res, next)=>{
   Product.find()
      .select('-__v')
      .then(docs => {
         const response = {
            count : docs.length,
            products : docs
         }
         res.json(response);
      })
      .catch(err => {
         res.status(500).json({
            message : "something went wrong",
            error : `${err.name} : ${err.message}`
         });
      });
});

router.get('/:id', (req, res, next)=>{
   const id = req.params.id;
   Product.findById(id)
      .then(doc => {
         if(doc){
            res.json({
               message : "Product found",
               product : doc
            });
         }
         res.status(404).json({
            message : "Product Not Found",
         });
      })
      .catch(err => {
         res.status(500).json({
            message : "something went wrong",
            error : `${err.name} : ${err.message}`
         });
      })
});


// POST ROUTE
router.post('/', (req, res, next)=>{

   const product = new Product({
      _id : new mongoose.Types.ObjectId(),
      name : req.body.name,
      price : req.body.price
   });

   product
      .save()
      .then(()=>{
         res.status(201).json({
            message : "Product was created",
            product
         });
      })
      .catch(err => {
         console.log(err);
      });
});

// PATCH ROUTE
router.patch('/:id', (req, res, next)=>{
   const id = req.params.id;
   const updateProps = {};
   for(const property of req.body){
      updateProps[property.propName] = property.value;
   }
   
   Product.updateOne({ _id : id }, { $set : updateProps })
      .then(result => {
         if(result.nModified === 1){
            res.json({
               result : "product updated"
            });
         }
         
      })
      .catch(err => {
         console.log(err);
         res.status(500).json({
            message : "something went wrong",
            error : `${err.name} : ${err.message}`
         });
      });
});

// DELETE ROUTE

router.delete('/:id', (req, res, next)=>{
   Product.deleteOne({ _id : req.params.id})
      .then(result => {
         if(result.deletedCount === 1){
            res.json({
               result : "product deleted"
            });
         }
      })
      .catch(err => {
         res.status(500).json({
            message : "something went wrong",
            error : `${err.name} : ${err.message}`
         });
      });
});

module.exports = router;