const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
   res.json({
      message : "You requested for list of all orders"
   });
});

router.get('/:id', (req, res, next)=>{
   const id = req.params.id;
   res.json({
      message : "You have requeste for a single order"
   });
});

router.post('/', (req, res, next)=>{
   const order = {
      productId : req.body.productId,
      quantity : req.body.quantity
   }
   res.status(201).json({
      message : "You are gonna create a new order",
      order
   });
});


router.delete('/:id', (req, res, next)=>{
   const id = req.params.id;
   res.json({
      message : "You are gonna delete a order"
   });
});

module.exports = router;