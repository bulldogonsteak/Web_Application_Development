/***********************************************************************************************************************
 *  Server Side - Routes - cart.js
 *  Cart Routes for shopping cart actions to be routed
 **********************************************************************************************************************/

// Imported Files
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.js');


router.post('/add',cartController.addToCart);
router.get('/view', cartController.viewCart);
router.post('/checkout', cartController.checkout);
router.get('/orders', cartController.viewOrders);

module.exports = router;