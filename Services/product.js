/***********************************************************************************************************************
 *  Server Side - Services - productService.js // TODO need to change this file name
 *  Product Services Methods
 **********************************************************************************************************************/

const product = require(`../Models/product.js`);
const mongoose = require("mongoose"); // Import product Model for this file

// TODO need to check within debugging session about this function
// Create a product asynchronous function - POST method
const createProduct = async (productData) => {
    // Try to create a new product object
    try {
        // TODO need to selfcheck if the product data is allready within the database
        // Create a new product object
        const product = new product({
            ...productData, // Usage of spread operator which assign all fields accordingly from the productData
        });

        // Return promise of the product saving in DB
        return await product.save();
    } // End of TRY

    catch (error) { // In case of any error
        console.log("Error creating product");
        throw new Error(`Error creating product: ${error.message}`);
    }
}; // End of createProduct function

// Get a product by a given id - GET method with a given id
const getProductById = async (id) => {
    // Try to find a product with given id
    try {
        return await product.findById(id); // Find a product with a given ID
    } catch (error) { // In Case of any error
        throw new Error(`Error getting product: ${error.message}`);
    }
}// End of getProductById function


// Get all products - Get the list of all general products within the stock
const getAllProducts = async () => {
    // Try to find all products within the DataBase
    try{
        return await product.find({}); // Find all products within the DataBase
    }
    catch (error) { // In any case of an error
        throw new Error(`Error getting all products: ${error.message}`);
    }
} // END OF getAllProducts function


module.exports = { // Export all of this file methods
    createProduct,
    getProductById,
    getAllProducts,
}