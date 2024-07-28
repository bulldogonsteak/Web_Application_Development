/***********************************************************************************************************************
 *  Server Side - Controllers - Login.js
 *  Login Controller File
 **********************************************************************************************************************/

// Imported Files
const User = require('../Models/User.js'); // Import User Model for updating sessionId
const loginService = require('../Services/login.js'); // Import Login Services File

// Function to check if user session is active - Middleware to log in incoming req to session
function isLoggedIn(req, res, next) {

    // Checks if User session's is offline
    if (req.session.emailAddress != null) {
        return next();
    } else { // The User's session is online
        res.redirect('/login'); // Redirecting the req back to the login page
    }
}

// Function for testing
function foo(req, res) {
    if (req.session.emailAddress != null) {
        return res.json({emailAddress: req.session.emailAddress})
    } else {
        res.redirect('/login');
    }
}

// Function to render the profile view and passes the username from the session to the view.
// Used as the name foo within the course studies
function CustomerProfiler(req, res) {
    res.render('customerPage', {emailAddress: req.session.emailAddress});
}

// Function to render the loginForm
function loginForm(req, res) {
    res.render('loginTest', {});
} // Adjust the name if necessary

// Function to render the registration form
function registerForm(req, res) {
    res.render('registerTest', {});
} // Adjust the name if necessary


// Function to log out a User from his personal page
// Should be synchronous in order to complete the logout procedure until total end of the User's session

const logout = async (req, res) => {
    try {
       const status =  await User.findByIdAndUpdate(req.session.emailAddress, { sessionId: null });
       if(status){
           req.session.destroy(() => {
               res.redirect('/login');
           });
       }
       else{
           return await res.status(500).json({message: 'User logging out attempt failed'});
       }
    } catch (err) {
        console.error(err);
        return await res.status(500).json({ error: err.message });
    }
};


// function logout(req, res) {
//     User.findByIdAndUpdate(req.session.emailAddress, {sessionId: null},)
//     // Destroy current User page and redirecting the user to the login page
//     req.session.destroy(() => {
//         res.redirect('/login');
//     });
// }


// Function to connecting a User to his personal Customer Page
// Should be asynchronous in order to not delay other incoming req to the server while the server deals with the database
async function login(req, res) {

    // Try to log in into the customer system
    try {
        // Multiple Initialization
        const {emailAddress, password} = req.body;

        // Finds if the user is register in the system
        const user = await User.findOne({emailAddress: emailAddress});

        if (user && (user.sessionId != null)) {
            return await res.status(403).json({error: 'User already logged in'});
        }

        // Log in attempt with given means of identifications
        const result = await loginService.login(emailAddress, password);

        // In case when the result is valid, user is not recognized in the system connection
        if (result) {
            const sessionId = req.sessionID
            // Approves the session by storing the email address
            req.session.emailAddress = emailAddress;

            // Update The new session of the user
            const status = await User.findByIdAndUpdate(emailAddress, {sessionId});

            if (status) {
                // Redirects to the user's profile page after successful login
                res.redirect('/');
            } else {
                return await res.status(403).json({error: 'User not logged in'});
            }
        } else { // Result is invalid

            // Redirect back to the login page with error indicator
            res.redirect('/login?error=1');
        }
    } catch (err) {
        console.log(err); // TODO self-debugging
        return await res.status(500).json({error: err.message});
    }
}


// Function to register a new user to his personal Customer Page
// Should be asynchronous in order to not delay other incoming req to the server while the server deals with the database
async function register(req, res) {

    // Edge case
    if (!req.body) {
        return await res.status(300).json({error: 'req.body is required'});
    }

    // Try to register a new user to the system
    try {
        // Attempt to register new user to the system DB
        const result = await loginService.register(req.body);

        // New User is created
        if (result) {

            // Creates a login session of the current user
            const sessionId = req.sessionID;
            // Approve the session with the according key value
            req.session.emailAddress = req.body.emailAddress;

            // Creates the sessionID for the user
            const status = await User.findByIdAndUpdate(req.body.emailAddress, {sessionId});

            if (status) {
                // Redirect the user for this homepage
                res.redirect('/');
            } else {
                console.log('User not logged in'); // TODO self-Debugging
                return await res.status(403).json({error: 'User not logged in'});
            }
        } else {
            // Prompts an error message, and indicates an error to the client-side
            return await res.status(405).json({error: `Could not register (${req.session.emailAddress}) into the system`});
        }
    } catch (err) { // In any case of exception
        // Redirect back to the register page with error indicator
        res.redirect('/register?error=1');
    }
}


module.exports = {
    isLoggedIn,
    loginForm,
    registerForm,
    foo,
    CustomerProfiler,
    logout,
    login,
    register,
}






