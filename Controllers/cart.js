/***********************************************************************************************************************
 *  Server Side - Controllers - cart.js
 *  Cart Controller for operating shopping cart with in the shop
 **********************************************************************************************************************/


// Imported Files
const cartServices = re


// Get
// Function to add products to the cart
const addToCart = async (req, res) => {
    // Try to add a product to cart

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