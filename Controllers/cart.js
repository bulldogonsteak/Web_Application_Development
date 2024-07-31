/***********************************************************************************************************************
 *  Server Side - Controllers - cart.js
 *  Cart Controller for operating shopping cart with in the shop
 **********************************************************************************************************************/


// Imported Files
const cartServices = require('../Services/cart.js'); // Imported cart Services to use methods
const User = require('../Models/User');

/**************************************** Controllers - Post Methods **************************************************/
// Function to add products to the cart
const addToCart = async (req, res) => {
    // Try to add a product to cart
    try {
        // Multiple initialization
        const {productId, quantity} = req.body;
        const emailAddress = req.session.emailAddress;

        // Check session key validity
        if (!emailAddress) {
            // Prompts error message
            console.error('Email address is required'); // TODO self-Debugging
            return await res.status(400).json({message: 'Email address is required'});
        }

        // Add a product into the cart
        const status = await cartServices.addToCart(emailAddress, productId, quantity);
        if (status) {
            // In case of successfully operation
            console.log("Product successfully added to cart"); // TODO self-Debugging
            return await res.status(200).json({message: "Product successfully added to cart"});
        } else { // In case of error within
            console.error('Error in addition a product to cart'); // TODO self-Debugging
            return await res.status(500).json({error: 'Error in addition a product to cart'});
        }

    } catch (err) { // In any case of an exception to the process
        console.error('Error in addition a product to cart'); // TODO self-Debugging
        return await res.status(500).json({error: 'Error in addition a product to cart'});
    }
};


// Function to check out a cart to pay all products within
const checkout = async (req, res) => {
    // Try to check out the order includes all item within current cart
    try {
        // Initialize variables (user within the session)
        const emailAddress = req.session.emailAddress;

        // Check session key validity
        if (!emailAddress) {
            // Prompts error message
            console.error('Email address is required'); // TODO self-Debugging
            return await res.status(400).json({message: 'Email address is required'});
        }

        // Checks out order details within all product in the cart
        const status = await cartServices.checkout(emailAddress);

        // Checks checkout status
        if (status) {
            console.log('Checkout successful'); // TODO self-Debugging
            res.status(200).json({message: 'Checkout successful'});
        } else { // In case of error within
            console.error('Error in Check out the cart'); // TODO self-Debugging
            return await res.status(500).json({error: 'Error in Check out the cart'});
        }
    } catch (error) { // In any case of an exception to the process
        console.error('Error in Check out the cart'); // TODO self-Debugging
        return await res.status(500).json({error: 'Error in Check out the cart'});
    }
};


/**************************************** Controllers - Get Methods ***************************************************/
// Function to view current cart order details
const viewCart = async (req, res) => {
    // Try to view User's Cart
    try {
        // Initialize variable
        const emailAddress = req.session.emailAddress;

        // Check if email is inserted through the client-side
        if (!emailAddress) {
            // Prompt error message
            console.error('Email address is required'); // TODO self-debugging
            return await res.status(400).json({message: 'Email address is required'});
        }

        // Request to view current cart from the cart services
        const status = await cartServices.viewCart(emailAddress);

        // Check operation status
        if (status) {
            // Prompts an error message
            console.log(`viewCart of ${emailAddress} was successful`);
            return await res.render('cart', {cart}); // TODO NEEDDDD TOOO CHECKKK THIIISSSS OUTTT
        } else {
            // Prompts an error message
            console.error('Error in view cart'); // TODO self-debugging
            return await res.status(403).json({error: 'Error in view cart'});
        }
    } catch (error) { // In any case of an exception
        return await res.status(500).json({error: error.message});
    }
}


module.exports = {
    addToCart,
    checkout,
    viewCart,
}

