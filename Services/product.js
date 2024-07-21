/***********************************************************************************************************************
 *  Server Side - Services - productService.js // TODO need to change this file name
 *  Product Services Methods
 **********************************************************************************************************************/

 const product = require(`../Models/product.js`);
const mongoose = require("mongoose"); // Import product Model for this file

// TODO need to check within debugging session about this function
// Create a product asynchronous function
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

// Get a product by a given id


// const getProductById = async (id) => {
//     // Try to find a product with given id
//     try {
//         return await product.findById(id);
//     } catch (error) {
//         throw new Error(`Error getting product: ${error.message}`);
//     }
// }


module.exports = { // Export all of this file methods
    createProduct,
}