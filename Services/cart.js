/***********************************************************************************************************************
 *  Server Side - Services - Cart.js
 *  Cart Services Methods
 **********************************************************************************************************************/

// Imported Files
const UserModel = require("../Models/User.js"); // Import user Model file for User's cart field
const productServices = require("../Services/Product.js");
const {errorStrictEqual} = require("mongodb/src/utils"); // Import product services file

// Post
// Function to add a product to the cart with given product id and quantity
const addToCart = async (emailAddress, productId,quantity) => {
    // Find if user is within the system
    const user = await User.findOne({emailAddress: emailAddress});

    // If User is not found within the system
    if (!user) {
        throw Error(`User with emailAddress ${emailAddress} does not exist`);
    }
}