/***********************************************************************************************************************
 *  Server Side - Routes - cart.js
 *  Cart Routes for shopping cart actions to be routed
 **********************************************************************************************************************/

// Imported Files
const express = require('express'); // Imported express Library
const cartController = require('../controllers/cart.js'); // Import cart Controller methods
const loginController = require('../Controllers/login.js'); // Import login Controller


// Create Router
const router = express.Router();


// Define cart routes
router.post('/add',loginController.isLoggedIn,cartController.addToCart);
router.get('/view', loginController.isLoggedIn ,cartController.viewCart);
router.post('/checkout', loginController.isLoggedIn,cartController.checkout);
router.get('/orders', loginController.isLoggedIn,cartController.viewOrders);

module.exports = router;