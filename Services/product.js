/***********************************************************************************************************************
 *  Server Side - Services - product.js
 *  Product Services Methods
 **********************************************************************************************************************/

// Imported files
const Product = require(`../Models/product.js`);
const mongoose = require("mongoose");


/******************************************* Services - Post Methods **************************************************/
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


// TODO get product by name -- need to use regex for it


/******************************************* Services - Update Methods ************************************************/
// Update a product by a given id -
const updateProduct = async (productId, productData) => {

    // Check if the given productId exists
    const product = await Product.findOne({_id: productId});

    // Product is not exists
    if (!product) {
        throw new Error(`Product with id ${productId} not found`);
    }

    // Find the product with the given ID, then use the $set operator to specify the fields within (using the spread operator)
    // Use await to ensure all updates are finished before proceeding
    const updatedProduct =  await Product.findByIdAndUpdate(productId, {$set: {...productData}}, {new: true})
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
    const isValidProduct = await Product.findOne({_id: productId});

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




//     // Find the product with the given ID, then use the $set operator to specify the fields within (using the spread operator)
//     // Use await to ensure all removals are finished before proceeding
// // const removedProduct = await Product.findByIdAndDelete(productId)
//             if (!updatedProduct) { // If the product was not found
//                 throw new Error(`Product with id ${productId} not found`);
//             } else { // Product was found
//                 console.log(`Product with id ${productId} is updated`); // TODO need to check with successful status
//                 return updatedProduct; // Returns the updated product
//             }
//         })
//         .catch(err => { // In any case of exception
//             console.error(`Error updating product with id ${productId} not found`);
//             throw err;
//         });
//
//     // Return the updated product to the controller
//     return product;
//

} // END of deleteProduct Function




module.exports = { // Export all of this file methods
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct,
}