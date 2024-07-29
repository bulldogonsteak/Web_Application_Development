/***********************************************************************************************************************
 *  Server Side - Controllers - cart.js
 *  Cart Controller for operating shopping cart with in the shop
 **********************************************************************************************************************/


// Imported Files
const cartServices = require('../Services/cart.js'); // Imported cart Services to use methods

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
        if(status){
            console.log('Checkout successful'); // TODO self-Debugging
            res.status(200).json({ message: 'Checkout successful' });
        }
        else{ // In case of error within
            console.error('Error in Check out the cart'); // TODO self-Debugging
            return await res.status(500).json({error: 'Error in Check out the cart'});
        }
    }
    catch(error){ // In any case of an exception to the process
        console.error('Error in Check out the cart'); // TODO self-Debugging
        return await res.status(500).json({error: 'Error in Check out the cart'});
    }
};


/**************************************** Controllers - Get Methods ***************************************************/



module.exports = {
    addToCart,
    checkout,
}

// try {
//     // Multiple initialization
//     const {productId, quantity} = req.body;
//
//     // Find user session
//     const user = await UserModel.findById(req.session.emailAddress);
//
//     // If user session is not found
//     if (!user) {
//         console.error("User not found"); // TODO self Debugging
//         return await res.status(400).json({error: "User session is not activated"});
//     }
//
//     // User session is activated
//     // Find product by productID
//     const product = await productService.getProductById(req.body.productId); // TODO needs to insert product Id to search
//
//     // If product is not found within the database
//     if (!product) {
//         console.error("Product not found");
//         return await res.status(404).json({error: "Product not found"});
//     }
//
//     const cartItem =
// }