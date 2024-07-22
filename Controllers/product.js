/***********************************************************************************************************************
 *  Server Side - Controllers - product.js
 *  Product Controller File
 **********************************************************************************************************************/


const productService = require("../Services/product.js"); // Import Services File to product

// Create a product - POST Method Handler
const createProduct = async (req, res) => {
    // Try to Create a new Product
    try{
        // Create a new product
        const newProduct = await productService.createProduct(req.body);
        if (!newProduct) {
            console.error("Product creation failed");// TODO Self Debugging
            return await res.status(400).json({error: "Product creation failed"});
        }
        // Product successfully saved
        console.log("product was created successfully"); // TODO Self Debugging
        return await res.status(201).json(newProduct);
    }
    catch(err){
        console.error(err);// TODO Self Debugging
        return await res.status(500).json({error: err.message});
    }
};


// Get all Products - GET Methods Handlers
const getAllProducts = async (req,res) => {
    // Try to Create a new product
    try{
        const Products = await productService.getAllProducts();
        console.log(Products); // TODO Self Debugging
        return await res.status(200).json(Products);
    }
    catch(err){
        console.log(err); // TODO Self Debugging
        return await res.status(500).json({error: err.message});
    }
}

// Get a Product with a given ID - GET Methods Handler
const getProductById = async (req, res) => {
    // Try to get a product with given id
    try{
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            console.error(`Product with productId ${req.params.id} not found`);
            return res.status(404).json({error: `Product with productId ${req.params.id} not found`});
        }

        console.log(`Product with productId: ${product.productId} is found`);
        return await res.status(200).json(product);
    }
    catch(err){
        console.log(err);
        return await res.status(500).json({error: err.message});
    }
}



module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
}