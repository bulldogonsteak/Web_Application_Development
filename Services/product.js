/***********************************************************************************************************************
 *  Server Side - Services - productService.js // TODO need to change this file name
 *  Product Services Methods
 **********************************************************************************************************************/

 const Product = require(`../Models/product.js`);
const mongoose = require("mongoose");


/*************************************************** POST Method ******************************************************/
// Create a product asynchronous function - POST method
const createProduct = async (productData) => {

    if (!productData) {
        // TODO edge case
    }

    // Checks if the product already exists within the Database
    const existingProduct = await Product.findOne({_id: productData._id});
    if (existingProduct) {
        console.log("The product is already in use within _id of " + productData._id);
        throw new Error(`Product already exists with productId ${productData._id}`);
    }
    // The given product is a new one
    const newProduct = new Product(productData);

    // Set newProduct._id to be the same as the given productID (to settle conflict in mongoDB)
    newProduct._id = productData.productId;

    return await newProduct.save();
}// End of createProduct function



/**************************************************** GET Method ******************************************************/
// Get a product by a given id - GET method with a given id
const getProductById = async (productId) => {
    // Finds Product with the given id
    const requestedProduct = await Product.findById(productId);

    // If the requested product is not found
    if (!requestedProduct) {
        throw new Error(`Product with _id ${productId} not found`);
    }
    return requestedProduct;
}// End of getProductById function


// Get all products - Get the list of all general products within the stock
const getAllProducts = async () => {
    return await Product.find({});
}


module.exports = { // Export all of this file methods
    createProduct,
    getProductById,
    getAllProducts,
}