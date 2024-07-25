/***********************************************************************************************************************
 *  Server Side - Controllers - Login.js
 *  Login Controller File
 **********************************************************************************************************************/

// Imported Files
const loginService = require('../Services/login.js'); // Import Login Services File
const expressSession = require('express-session'); // Import express-session Library

// Function to check if user session is active - Middleware to log in incoming req to session
function isLoggedIn(req, res, next) {

    // Checks if User session's is offline
    if (req.session.emailAddress != null) {
        return next();
    } else { // The User's session is online
        res.redirect('/login'); // Redirecting the req back to the login page
    }
}

// Function to render the profile view and passes the username from the session to the view.
// Used as the name foo within the course studies
function CustomerProfiler(req,res){
    res.render('customerPage', {emailAddress: req.session.emailAddress});
}






