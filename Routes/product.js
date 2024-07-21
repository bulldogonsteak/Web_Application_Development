/***********************************************************************************************************************
 *  Server Side - Routes - productRoutes.js
 *  Product Routes For Incoming Requests From Client-Side
 **********************************************************************************************************************/

const express = require('express'); // Import express Library
const router = express.Router(); // Create a router for incoming requests from Client-Side
const productController = require('../controllers/productController'); // Import file product Controller Version

router.route('/products') // URL request for homepage for products
    .get(productController.getProducts) // GET method - Get a list of products
    .post(productController.createProduct); // POST method - Create a product

router.route('/products/:id') // URL request for a specific product with id
    .get(productController.getProduct) // GET method - Get a specific product within given an id
    .put(productController.updateProduct)// PUT method - Update a specific product with the given id
    // TODO need to check the validity of the id within the models
    .delete(productController.deleteProduct); // DELETE method - Delete a specific product within the given id

module.exports = router; // Exporting the routes included within this file router
