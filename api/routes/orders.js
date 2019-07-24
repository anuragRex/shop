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
   res.status(201).json({
      message : "You are gonna create a new order"
   });
});


router.delete('/:id', (req, res, next)=>{
   const id = req.params.id;
   res.json({
      message : "You are gonna delete a order"
   });
});

module.exports = router;