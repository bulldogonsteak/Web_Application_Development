/***********************************************************************************************************************
 *  Server Side - Services - product.js
 *  Product Services Methods
 **********************************************************************************************************************/

// Imported files
const Product = require('../Models/product.js');
const mongoose = require("mongoose");
const req = require("express/lib/request");
const res = require("express/lib/response");

/******************************************* Services - Post Methods **************************************************/
// Create a product asynchronous function - POST method
const createProduct = async (productData) => {

    // Checks if data is within
    if (!productData) {
        // Prompts an error message
        console.log("Product Data is not found"); // TODO self-Debugging
        throw new Error("Product Data is not found");
    }

    // Checks if the product already exists within the Database
    const existingProduct = await Product.findOne({ _id: productData._id });

    // Checks status of existed product
    if (existingProduct) {
        // Prompts an error message
        console.log(`Product already exists with productId ${productData._id}`); // TODO self-Debugging
        throw new Error(`Product already exists with productId ${productData._id}`);
    }
    // The given product is a new one
    const newProduct = new Product(productData);

    // Set newProduct._id to be the same as the given productID (to settle conflict in mongoDB)
    newProduct._id = productData.productId;

    // Save new Product details within the DB
    return await newProduct.save();
}// End of createProduct function


/******************************************* Services - Get Methods ***************************************************/
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


// Search products based on multiple parameters
const searchProducts = async (searchParams) => {

    // In case of no search params
    if (!searchParams) {
        // Prompts an error message
        console.log("Search parameters are not found"); // TODO self-debugging
        throw new Error("Search parameters are not found");
    }

    // Initialize an empty query res
    const query = {};

    // Cases of search parameters to search, define proper fields
    if (searchParams.name && searchParams.name.length > 0) { // Search products by name

        // Insert to query name field to current regex with indicator flag (i)
        query.name = { $regex: searchParams.name, $options: 'i' };
    }

    if (searchParams.platform && searchParams.platform.length > 0) { // search products by platform

        // Split each word block to an element with the token of ","
        query.platform = { $in: searchParams.platform.split(',') };

    }

    if (searchParams.genre && searchParams.genre.length > 0) { // Search products by genre

        // Insert genre searchParams to the query.genre field
        query.genre = searchParams.genre;
    }

    if (searchParams.minPrice && searchParams.maxPrice) {

        // Iterate from the minPrice to the maxPrice and return the results of the given range prices to iterate
        query.price = { $gte: parseFloat(searchParams.minPrice), $lte: parseFloat(searchParams.maxPrice) };
    }

    // Search within the DB all given possibility results and return them to the Controller
    return await Product.find(query);

}

// Group products by genre and get the count of products in each genre - GET Methods Handler
const groupProductsByGenre = async () => {

    // Execute GroupBy operation to divide products by genre,
    // And pushes each product to the proper subset genre by the value of the product's field
    const groupedProducts = await Product.aggregate([
        { $group: { _id: "$genre", products: { $push: "$$ROOT" } } }
    ]);

    if (groupedProducts) {
        console.log(groupedProducts); // TODO self-debugging
        return groupedProducts;
    }
    else {
        console.error('Error in grouping products by genre:'); // TODO self-debugging
        throw new Error('Error in grouping products by genre');
    }
};

// Group products by platform and get the count of products in each platform - GET Methods Handler
const groupProductsByPlatform = async () => {
    // Execute GroupBy operation to divide products by platform,
    // And count each product in the proper subset by the value of the product's platform field
    const groupedProducts = await Product.aggregate([
        { $unwind: "$platform" },
        { $group: { _id: "$platform", count: { $sum: 1 } } }
    ]);

    if (groupedProducts) {
        console.log(groupedProducts); // TODO self-debugging
        return groupedProducts;
    }
    else {
        console.error('Error in grouping products by platform:'); // TODO self-debugging
        throw new Error('Error in grouping products by platform');
    }
};

/******************************************* Services - Update Methods ************************************************/
// Update a product by a given id -
const updateProduct = async (productId, productData) => {

    // Check if the given productId exists
    const product = await Product.findOne({ _id: productId });

    // Product is not exists
    if (!product) {
        throw new Error(`Product with id ${productId} not found`);
    }

    // Find the product with the given ID, then use the $set operator to specify the fields within (using the spread operator)
    // Use await to ensure all updates are finished before proceeding
    const updatedProduct = await Product.findByIdAndUpdate(productId, { $set: { ...productData } }, { new: true })
        .then(updatedProduct => {
            if (!updatedProduct) { // If the product was not found
                throw new Error(`Product with id ${productId} not found`);
            } else { // Product was found
                console.log(`Product with id ${productId} is updated`); // TODO need to check with successful status
                return updatedProduct; // Returns the updated product
            }
        })
        .catch(err => { // In any case of exception
            console.error(`Error updating product with id ${productId} not found`);
            throw err;
        });

    // Return the updated product to the controller
    return product;
} // END of updateProduct function


/******************************************* Services - Delete Methods ************************************************/

// Delete a product with a given product ID - DELETE method
const deleteProduct = async (productId) => {
    // Check if the given productId exists
    const isValidProduct = await Product.findOne({ _id: productId });

    // Product is not exists
    if (!isValidProduct) {
        throw new Error(`Product with id ${productId} not found`);
    }

    // Use await to ensure the remove is finished before proceeding
    const removedProduct = await Product.findByIdAndDelete(productId)
        .then(removedProduct => {

            if (!removedProduct) { // In case when product is not found
                console.log(`Product with id ${productId} not found`); // TODO self Debugging
                throw new Error(`Product with id ${productId} not found`);

            } else { // Product is found
                console.log(`Product with id ${productId} deleted`);// TODO self Debugging
                return removedProduct; // Returned value back to the controller
            }
        })
        .catch(err => { // In any case of exception
            console.error(`Error deleting product with id ${productId}`);
            throw err;
        });

} // END of deleteProduct Function


module.exports = { // Export all of this file methods
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct,
    searchProducts,
    groupProductsByGenre,
    groupProductsByPlatform,
}
