/***********************************************************************************************************************
 *  Server Side - Services - Cart.js
 *  Cart Services Methods
 **********************************************************************************************************************/

// Imported Files
const User = require("../Models/User.js"); // Import user Model file for User's cart field
// const Product = require("../Models/Product.js"); // Import Product Model file for accessing products fields
const productServices = require("../Services/Product.js");
const loginServices = require("../Services/login.js");


/******************************************* Services - Post Methods **************************************************/
// Function to add a product to the cart with given product id and quantity
const addToCart = async (emailAddress, productId, quantity) => {
    // Find if user is within the system
    const user = await User.findById(emailAddress);

    // If User is not found within the system
    if (!user) {
        // Prompts an error message
        throw Error(`User with emailAddress ${emailAddress} does not exist`);
    }

    // Checks if user session is active
    const sessionStatus = await loginServices.isUserSessionAlive(emailAddress);
    if (!sessionStatus) {
        // Prompt error message to the user
        console.error(`User session for emailAddress ${emailAddress} is not active`); // TODO self-Debugging
        throw new Error(`User session for emailAddress ${emailAddress} is not active`);
    }

    // Finds the product the user requests
    const product = await productServices.getProductById(productId);

    // If product is not found
    if (!product) {
        // Prompts an error message
        console.error(`Product with id ${productId} not found`); // TODO self-Debugging
        throw Error(`Product with productId ${productId} does not exist`);
    }

    // Add to the cart the item with a given product ID
    // For each item in the cart that already in
    const cartItem = await user.cart.find(item => item.productId.toString() === productId.toString());

    // In case the product exists in the cart
    if (cartItem) {
        // Maybe should be 0 // TODO check this
        cartItem.quantity += quantity;
        cartItem.totalPrice = cartItem.quantity * product.price;
    } else { // New product is not within the cart
        // TODO check if there is need to drop the stock
        user.cart.push({productId, quantity, totalPrice: product.price * quantity});
    }

    // Update current items within the cart
    return await user.save();
}


// Function to check out a cart to pay all products within
const checkout = async (emailAddress) => {
    // Find if user is within the system
    const user = await User.findById(emailAddress);

    // If User is not found within the system
    if (!user) {
        // Prompts an error message
        console.error(`User with emailAddress ${emailAddress} does not exist`); // TODO self-Debugging
        throw Error(`User with emailAddress ${emailAddress} does not exist`);
    }

    // Checks if user session is active
    const sessionStatus = await loginServices.isUserSessionAlive(emailAddress);
    if (!sessionStatus) {
        // Prompt error message to the user
        console.error(`User session for emailAddress ${emailAddress} is not active`); // TODO self-Debugging
        throw new Error(`User session for emailAddress ${emailAddress} is not active`);
    }

    // TODO needs to implement payment method

    // Extend product details
    const userCart = user.populate('cart.productId');

    // Create new order from all cart content
    const OrderItems = user.cart.map((cartItem) => ({
        productId: cartItem.productId,
        name: cartItem.name,
        price: cartItem.price,
        quantity: cartItem.quantity,
        totalPrice: cartItem.totalPrice,
    }));

    // Push items within the cart and calculate total price
    await user.orders.push({items: OrderItems, orderDate: new Date()});

    // Empty User's cart
    user.cart = [];

    // Update current User's details
    return await user.save();
};

/******************************************* Services - Get Methods ***************************************************/
// Function to view all products within the current shopping cart of the user
const viewCart = async (emailAddress) => {
    // Find if user is within the system
    const user = await User.findById(emailAddress);

    // If User is not found within the system
    if (!user) {
        // Prompts an error message
        console.error(`User with emailAddress ${emailAddress} does not exist`) // TODO self-Debugging
        throw Error(`User with emailAddress ${emailAddress} does not exist`);
    }

    // Checks if user session is active
    const sessionStatus = await loginServices.isUserSessionAlive(emailAddress);
    if (!sessionStatus) {
        // Prompt error message to the user
        console.error(`User session for emailAddress ${emailAddress} is not active`); // TODO self-Debugging
        throw new Error(`User session for emailAddress ${emailAddress} is not active`);
    }

    // Return user cart field back
    return user.cart;
}


// Function to view all Orders of the User's account
const viewOrders = async (emailAddress) => {
    // Find if user is within the system
    const user = await User.findById(emailAddress);

    // If User is not found within the system
    if (!user) {
        // Prompts an error message
        console.error(`User with emailAddress ${emailAddress} does not exist`) // TODO self-Debugging
        throw Error(`User with emailAddress ${emailAddress} does not exist`);
    }

    // Checks if user session is active
    const sessionStatus = await loginServices.isUserSessionAlive(emailAddress);
    if (!sessionStatus) {
        // Prompt error message to the user
        console.error(`User session for emailAddress ${emailAddress} is not active`); // TODO self-Debugging
        throw new Error(`User session for emailAddress ${emailAddress} is not active`);
    }

    return user.orders;
}


module.exports = {
    addToCart,
    checkout,
    viewCart,
    viewOrders,
}