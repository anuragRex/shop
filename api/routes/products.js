const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const multer = require('multer');
const auth = require('../middlewares/check-auth');
const { 
   products_get_all, 
   products_get_one,
   products_delete_product 
} = require('../controllers/products');

const storage = multer.diskStorage({
   destination : function(req, file, callback){
      callback(null, './uploads/');
   },
   filename : function(req, file, callback){
      callback(null, new Date().toISOString() + file.originalname);
   }
});

// custom fileFilter
const fileFilter = function(req, file, callback){
   if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      // Accept a file
      callback(null, true);
   }else{
      // Reject a file
      callback(new Error('only jpg or png files are allowed'), false);
   }
}

// Configuring multer
const upload = multer({
   storage,
   limits : {
      fileSize : 1024 * 1024 * 5
   },
   fileFilter
});

// GET ROUTES

router.get('/', products_get_all);

router.get('/:id', products_get_one);


// POST ROUTE
router.post('/', [auth, upload.single('productImage')], (req, res, next)=>{

   const product = new Product({
      _id : new mongoose.Types.ObjectId(),
      name : req.body.name,
      price : req.body.price,
      productImage : req.file.path
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
router.patch('/:id', auth, (req, res, next)=>{
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

router.delete('/:id', auth, products_delete_product);

module.exports = router;