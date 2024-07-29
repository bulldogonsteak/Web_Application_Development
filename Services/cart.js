/***********************************************************************************************************************
 *  Server Side - Services - Cart.js
 *  Cart Services Methods
 **********************************************************************************************************************/

    // Imported Files
const User = require("../Models/User.js"); // Import user Model file for User's cart field
const productServices = require("../Services/Product.js");


// Post
// Function to add a product to the cart with given product id and quantity
const addToCart = async (emailAddress, productId, quantity) => {
    // Find if user is within the system
    const user = await User.findById(emailAddress);

    // If User is not found within the system
    if (!user) {
        throw Error(`User with emailAddress ${emailAddress} does not exist`);
    }

    // Finds the product the user requests
    const product = await productServices.getProductById(productId);

    // If product is not found
    if (!product) {
        throw Error(`Product with productId ${productId} does not exist`);
    }

    // Add to the cart the item with a given product ID
    // For each item in the cart that already in
    const cartItem = await user.cart.find(item => item.productId === productId);

    // In case the product is a
    if (cartItem) {
        // Maybe should be 0 // TODO check this
        cartItem.quantity += quantity;
    } else { // If the cartItem is not within
        // TODO check if there is need to drop the stock
        user.cart.push({productId, quantity});
    }

    // Return updated user information
    return await user.save();
}


