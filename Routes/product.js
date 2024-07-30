/***********************************************************************************************************************
 *  Server Side - Routes - product.js
 *  Product Routes For Incoming Requests From Client-Side
 **********************************************************************************************************************/

// Imported files
const express = require('express'); // Import express Library
const router = express.Router(); // Create a router for incoming requests from Client-Side
const productController = require('../Controllers/product.js'); // Import file product Controller Version


// Url: http://localhost:8088/products/
// Home Page of products
router.route('/') // URL request for homepage for products
    .get(productController.getAllProducts) // GET method - Get a list of products


// Url: http://localhost:8088/products/search
// Search products based on parameters
router.route('/search') // URL request for search products
    .get(productController.searchProducts); // GET method - Search products based on parameters


// Url: http://localhost:8088/products/groupByGenre
// Group products by genre and get the count of products in each genre
router.route('/groupByGenre') // URL request for GroupBy products
    .get(productController.groupProductsByGenre); // GET method - Group products by genre


// Url: http://localhost:8088/products/:productId
// Pages of a specific ID
router.route('/:productId') // URL segment request for a specific product with id
    .get(productController.getProductById) // GET method - Get a specific product within given an id
    .post(productController.createProduct) // POST method - Create a new product with a given request body
    .patch(productController.updateProduct)// PATCH method - Update a specific product with the given id
    .delete(productController.deleteProduct); // DELETE method - Delete a specific product within the given id

module.exports = router; // Exporting the routes included within this file router
