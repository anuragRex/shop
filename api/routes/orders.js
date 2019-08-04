const express = require('express');
const router = express.Router();
const auth = require('../middlewares/check-auth');
const { 
   orders_get_all, 
   orders_get_one, 
   orders_create_order,
   orders_delete_order 
} = require('../controllers/orders');

// Handling GET Requests
router.get('/', auth, orders_get_all);

router.get('/:id', auth, orders_get_one);

// Handling POST requests
router.post('/', auth, orders_create_order);

// Handling Delete Requests
router.delete('/:id', auth, orders_delete_order);

module.exports = router;