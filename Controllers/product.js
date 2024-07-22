/***********************************************************************************************************************
 *  Server Side - Controllers - product.js
 *  Product Controller File
 **********************************************************************************************************************/


const productService = require("../Services/product.js"); // Import Services File to product

// Create a product - POST Method Handler
const createProduct = async (req, res) => {
    // Try to Create a new Product
    try {
        // TODO need to search if the product already exists if not needs to create it
        const newProduct = await productService.createProduct(req.body); // Create a new article // TODO in Body most be the parameters for a new product
        console.log(newProduct);
        return await res.status(201).json(newProduct); // Returns the new product back to the Client
    } catch (error) {
        console.log("Error creating product"); // TODO self debugging
        return await res.status(400).json({}); // returns Empty Object with Error Status 400
    }
}


// Get all Articles - GET Methods Handlers
const getAllProducts = async (req,res) => {
    // Try to get all Products within the current stock
    try{
        const products = await productService.getAllProducts();
        await res.status(200).json(products);
    }
    catch (error) {
        console.log("Error getting all products");
        return await res.status(400).json({errors: error.message});
    }
}



module.exports = {
    createProduct,
    getAllProducts,

}