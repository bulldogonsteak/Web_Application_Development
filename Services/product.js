/***********************************************************************************************************************
 *  Server Side - Services - productService.js // TODO need to change this file name
 *  Product Services Methods
 **********************************************************************************************************************/

const product = require(`../Models/product.js`); // Import product Model for this file

// Create a product
const createProduct = async (/**********/) => {
    //const product = await product.create();
    const product = new product({
        // TODO Fields required
    })
    await product.save();
}
