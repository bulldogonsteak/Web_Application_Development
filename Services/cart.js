/***********************************************************************************************************************
 *  Server Side - Services - Cart.js
 *  Cart Services Methods
 **********************************************************************************************************************/

// Imported Files
const User = require("../Models/User.js"); // Import user Model file for User's cart field
// const Product = require("../Models/Product.js"); // Import Product Model file for accessing products fields
const productServices = require("../Services/product.js");
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

    // Check if there's enough stock for the requested quantity
    if (product.stock < quantity) {
        // Prompts an error message
        console.error(`Not enough stock for product with id ${productId}`); // TODO self-Debugging
        throw Error(`Not enough stock for product with id ${productId}`);
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

    // Decrease the product stock
    product.stock -= quantity;

    // Save Product updated data
    await product.save()

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

    // Return all User's orders details
    return user.orders;
}


/******************************************* Services - Delete Methods ************************************************/

// Function to delete product from cart
const deleteFromCart = async (emailAddress, productId) => {
    // Find if the user is within the system
    const user = await User.findById(emailAddress);

    // If User is not found within the system
    if (!user) {
        // Prompts an error message
        console.error(`User with emailAddress ${emailAddress} does not exist`);
        throw new Error(`User with emailAddress ${emailAddress} does not exist`);
    }

    // Checks if user session is active
    const sessionStatus = await loginServices.isUserSessionAlive(emailAddress);
    if (!sessionStatus) {
        // Prompt error message to the user
        console.error(`User session for emailAddress ${emailAddress} is not active`); // TODO self-Debugging
        throw new Error(`User session for emailAddress ${emailAddress} is not active`);
    }

    // Finds the product the user requests with in DB records
    const product = await productServices.getProductById(productId);

    // Check if the
    if (!product) {
        // Prompts an error message
        console.error(`Product with productId ${productId} does not exist in the DataBase`);
        throw new Error(`Product with productId ${productId} does not exist in the dataBase`);
    }

    // Find product within the cart
    const cartItemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    // If the product is not found
    if(cartItemIndex === -1) {
        console.error(`Product with productId ${productId} does not exist in the cart`);
        throw new Error(`Product with productId ${productId} does not exist in the cart`);
    }

    // Get the quantity of the item to be removed
    const cartItem = user.cart[cartItemIndex];

    // Increase the product stock
    product.stock += cartItem.quantity;

    // Remove the product from the cart
    user.cart.splice(cartItemIndex, 1);

    // Update the current product data details
    await product.save();

    // Save the updated user data
    return await user.save();
}


/******************************************* Services - Update Methods ************************************************/

// Function to update a new product to the
module.exports = {
    addToCart,
    checkout,
    viewCart,
    viewOrders,
    deleteFromCart,
}