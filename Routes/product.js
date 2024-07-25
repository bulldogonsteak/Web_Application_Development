/***********************************************************************************************************************
 *  Server Side - Routes - productRoutes.js
 *  Product Routes For Incoming Requests From Client-Side
 **********************************************************************************************************************/

// Imported files
const express = require('express'); // Import express Library
const router = express.Router(); // Create a router for incoming requests from Client-Side
const productController = require('../Controllers/product.js'); // Import file product Controller Version

// Home Page of products
router.route('/') // URL request for homepage for products
    .get(productController.getAllProducts) // GET method - Get a list of products


// Pages of a specific ID
router.route('/:productId') // URL segment request for a specific product with id
    .get(productController.getProductById) // GET method - Get a specific product within given an id
    .post(productController.createProduct)
    .patch(productController.updateProduct)// PATCH method - Update a specific product with the given id
    .delete(productController.deleteProduct); // DELETE method - Delete a specific product within the given id

module.exports = router; // Exporting the routes included within this file router
