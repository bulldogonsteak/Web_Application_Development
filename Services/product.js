/***********************************************************************************************************************
 *  Server Side - Services - productService.js // TODO need to change this file name
 *  Product Services Methods
 **********************************************************************************************************************/

const product = require(`../Models/product.js`); // Import product Model for this file

// TODO need to check within debugging session about this function
// Create a product asynchronous function
const createProduct = async (productData) => {
    // Try to create a new product object
    try {
        // Create a new product object
        const product = new product({
            ...productData, // Usage of spread operator which assign all fields accordingly from the productData
        });

        // Return promise of the product saving in DB
        return await product.save();
    } // End of TRY

    catch(error){ // In case of any error
        throw new Error(`Error creating product: ${error.message}`);
    }
}; // End of createProduct function
