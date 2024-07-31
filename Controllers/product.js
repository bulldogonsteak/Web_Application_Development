/***********************************************************************************************************************
 *  Server Side - Controllers - product.js
 *  Product Controller File
 **********************************************************************************************************************/
 
//Imported files
const productService = require("../Services/product.js"); // Import Services File to product
const User = require("../Models/User.js");
const axios = require('axios');
// Function to post to Facebook
const postToFacebook = async (product) => {
    const pageAccessToken = 'EAAE8Yq17GCABO6bDs4AdjJNFUd1gL63YhxIOZAwvTMV3z0zo7O7XK5qwNm2YONeF0f0YshWnfDgJ95UulSQjlm3I9Q16zMO4EwZBhVLnOau7LT5kDnyZAHZBUBZByNEPMYBIkONxZB80QF8Q2CfvSRGfvKOZB8Uac4SAbvqDGUZCdFFJXbZC1O9abthmjIU3o0FURUsyvJ4FVoU9Y7NKzXpnsfqnz'
    const pageId = '323031390904629'; 
 
    const message = `
      New Product: ${product.name}
      Price: $${product.price}
      Description: ${product.description}
    `;
 
    try {
      const response = await axios.post(`https://graph.facebook.com/${pageId}/feed`, {
        message: message,
        access_token: pageAccessToken
      });
      console.log('Successfully posted to Facebook:', response.data.id);
    } catch (error) {
      console.error('Error posting to Facebook:', error.response ? error.response.data : error.message);
    }
  };
/**************************************** Controllers - Post Methods **************************************************/
// Create a product - POST Method Handler
const createProduct = async (req, res) => {
 
    // Checks User's type
    if (req.body.isManager !== 'manager') {
        // Prompts error message
        console.log("You don't have permission to manage product");// TODO Self Debugging
        return await res.status(400).json({message: "You don't have permission to manage product"});
    }
 
    // Try to Create a new Product
    try {
        // Create a new product
        const newProduct = await productService.createProduct(req.body);
        if (!newProduct) {
            console.error("Product creation failed");// TODO Self Debugging
            return await res.status(400).json({error: "Product creation failed"});
        }
        postToFacebook(newProduct); 
        // Product successfully saved
        console.log("product was created successfully"); // TODO Self Debugging
        return await res.status(201).json(newProduct);
    } catch (err) { // Exception Handler
        console.error(err);// TODO Self Debugging
        return await res.status(500).json({error: err.message});
    }
};
 
 
/**************************************** Controllers - Get Methods ***************************************************/
// Get all Products - GET Methods Handlers
const getAllProducts = async (req, res) => {
    // Try to Create a new product
    try {
        const Products = await productService.getAllProducts();
        console.log(Products); // TODO Self Debugging
        return await res.status(200).json(Products);
    } catch (err) {
        console.log(err); // TODO Self Debugging
        return await res.status(500).json({error: err.message});
    }
};
 
 
// Get a Product with a given ID - GET Methods Handler
const getProductById = async (req, res) => {
    // Try to get a product with given id
    try {
        // Get a product with product-Services API
        const product = await productService.getProductById(req.params.productId);
        if (!product) { // In case product is not found
            console.error(`Product with id ${req.params.productId} not found`); // TODO Self Debugging
            return res.status(404).json({error: `Product with id ${req.params.productId} not found`});
        }
 
        console.log(`Product with id: ${product.productId} is found`); // TODO Self Debugging
        return await res.status(200).json(product);
    } catch (err) { // In any case of exception
        console.log(err); // TODO Self Debugging
        return await res.status(500).json({error: err.message});
    }
};
 
 
/**************************************** Controllers - Update Methods ************************************************/
// Update a Product with a given id - Update Method (put,patch)
const updateProduct = async (req, res) => {
    // Checks User's type
    if (req.body.isManager !== 'manager') {
        // Prompts error message
        console.log("You don't have permission to manage product");// TODO Self Debugging
        return await res.status(400).json({message: "You don't have permission to manage product"});
    }
 
    // Try to update a product with a given id
    try {
        // Check if productId is within the body request
        const productId = req.params.productId;
        if (!productId) {
            return await res.status(400).json({error: `Product ID is requested to update a product`});
        }
 
        // Update the product
        const updatedProduct = await productService.updateProduct(req.params.productId, req.body);
        if (!updatedProduct) {
            console.error(`Product with id ${req.body.productId} not found`);
            return await res.status(404).json({error: `Product with id ${req.body.productId} not found`});
        }
 
        // Returns the updated product
        console.log(`Product with id: ${updatedProduct.productId} was updated successfully`);
        return await res.status(200).json(updatedProduct);
    } catch (err) { // Exception handler
        return await res.status(500).json({error: err.message});
    }
};
 
 
// TODO update many
 
 
/**************************************** Controllers - Delete Methods ************************************************/
// Delete a Product with a given id - Delete method
const deleteProduct = async (req, res) => {
    // Checks User's type
    if (req.body.isManager !== 'manager') {
        // Prompts error message
        console.log("You don't have permission to manage product");// TODO Self Debugging
        return await res.status(400).json({message: "You don't have permission to manage product"});
    }
 
    // Try to delete a product with a given id
    try {
        // Check if productId is within the body request
        const productId = req.params.productId;
        if (!productId) {
            return await res.status(400).json({error: `Product ID is requested to delete a product`});
        }
 
        // Delete a product
        const removedProduct = await productService.deleteProduct(productId);
        if (removedProduct !== undefined) {
            console.error(`Product with id ${productId} could not be deleted`);
            return await res.status(400).json({error: `Product with id ${productId} could not be deleted`});
        }
 
        // Product removed successfully
        console.log(`Product with id: ${req.params.productId} was deleted successfully`);
        return await res.status(200).json(`Product with id: ${req.params.productId} was deleted successfully`);
 
    } catch (err) { // In any case of exception
        console.error(`Product with id ${req.params.productId} could not be deleted`);
        return await res.status(500).json({error: err.message});
    }
};
 
// Exporting function of this file to the other files to be importing this file
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
}