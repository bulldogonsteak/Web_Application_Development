/***********************************************************************************************************************
 *  Server Side - Services - productService.js // TODO need to change this file name
 *  Product Services Methods
 **********************************************************************************************************************/

const Product = require(`../Models/product.js`);

// Create a product asynchronous function - POST method
const createProduct = async (productData) => {
    // Checks if the product already exists within the Database
    const existingProduct = await Product.findOne({productId: productData.productId});
    if (existingProduct) {
        console.log("The product is already in use within productId of " + productData.productId);
        throw new Error(`Product already exists with productId ${productData.productId}`);
    }

    // The given product is a new one
    const newProduct = new Product({...productData});
    return await newProduct.save();
}// End of createProduct function


// Get a product by a given id - GET method with a given id
const getProductById = async (id) => {
    // Finds Product with the given id
    const requestedProduct = await Product.findById(id);

    // If the requested product is not found
    if (!requestedProduct) {
        throw new Error(`Product with productId ${id} not found`);
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