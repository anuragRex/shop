const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', (req, res, next)=>{
   res.json({
      message : "You requested for list of all products"
   });
});

router.get('/:id', (req, res, next)=>{
   const id = req.params.id;
   res.json({
      message : "You have requeste for a single product"
   });
});

router.post('/', (req, res, next)=>{

   const product = new Product({
      _id : new mongoose.Types.ObjectId(),
      name : req.body.name,
      price : req.body.price
   });

   product.save();

   res.status(201).json({
      message : "You are gonna create a new product",
      product
   });
});

router.patch('/', (req, res, next)=>{
   res.json({
      message : "You are gonna update product"
   });
});

router.delete('/:id', (req, res, next)=>{
   res.json({
      message : "You are gonna delete a product"
   });
});

module.exports = router;