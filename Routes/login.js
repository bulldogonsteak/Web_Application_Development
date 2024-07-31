/***********************************************************************************************************************
 *  Server Side - Routes - Login.js
 *  Login Routes For Incoming Requests Coming From Client-Side
 **********************************************************************************************************************/

    // Imported Files
const express = require('express'); // Import express Library
const loginController = require('../Controllers/login.js');

// Create router
const router = express.Router();

// Define Routes
// http://localhost:8088/loginHome
router.post('/register', loginController.register); // Handle registration
router.get('/register', loginController.registerForm); // Show register form
router.post('/login', loginController.login); // Handle login
router.get('/login', loginController.loginForm); // Show login Home Page
router.get(`/user/logout`,loginController.logout); // Handle logout
router.get(`/user`, loginController.isLoggedIn, loginController.foo); // Main page or profile page


module.exports = router; // Export the login.js router
