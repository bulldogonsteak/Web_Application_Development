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
router.post('/register', loginController.register);
router.post('/login', loginController.login);
router.get(`/logout`,loginController.logout);
router.get('/', loginController.isLoggedIn, loginController.CustomerProfiler);


module.exports = router; // Export the login.js router
