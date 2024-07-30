/***********************************************************************************************************************
 * Server Side - app.js
 *
 * Main Server Application File
 *
 **********************************************************************************************************************/

// Import JavaScript Libraries For Project Usage
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors') // MiddleWare
const session = require('express-session'); // Import express-session to create session ID
const dotenv = require('dotenv'); // Import dotenv to load environment variables

// Config Environment File path for current process
require('custom-env').env(process.env.NODE_ENV, './config');

mongoose.connect(process.env.CONNECTION_STRING, { // Mongoose Connection is settled with the script
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { // After connection do prompt a message to the console for successful operation
        console.log('Connected to MongoDB') // TODO conencted to mongoDB
    })// Check if connection attend to succeed
    .catch(err => { // Exception for DB connection
        console.log('Could not connect to MongoDB', err)
    });


// Create a server
const app = express();
console.log("Server Created")


// Create sessions within the server
app.use(session({
    secret: 'foo', // sign the session ID cookie
    saveUninitialized: true, // session middleware will create new session for every new request
    resave: false, // session middleware will ensure session data is refreshed and not lost
    cookie:{
        httpOnly: true,
        maxAge: 80000000, // cookie saves for 1 min
    }
}))

// app.set
app.set('view engine', 'ejs') // Set ejs engine in server to insure render functionally


// app.use
app.use(express.static('Public')); // Use Public as static file
app.use(cors()); // Initialize MiddleWare
app.use(bodyParser.urlencoded({extended: true})); // MiddleWare parsing Url-Encoded Data from incoming requests
app.use(express.json()); // MiddleWare for parsing JSON payloads from incoming requests
app.use(express.urlencoded({extended: false})); // use URL-ENCODED for define key-value structure for incoming requests

// Set Object Routes
// Product
const productRoutes = require('./Routes/product.js');
app.use('/products', productRoutes);

// Login
const loginRoutes = require('./Routes/login.js');
app.use('/loginHome',loginRoutes);




// Main Server Listening Port
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});