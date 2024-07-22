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
const dotenv = require('dotenv'); // Import dotenv to load environment variables

// Config Environment File path for current process
require('custom-env').env(process.env.NODE_ENV, './config');

////////////////////////////////////////////////////////////////////
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB') // TODO conencted to mongoDB
    })// Check if connection attend to succeed
    .catch(err => {
        console.log('Could not connect to MongoDB',err)
    });
/////////////////////////////////////////////////////////////////////////

// Create a server
const app = express();
console.log("Server Created")

// app.use
app.use(express.static('Public')); // Use Public as static file
console.log("express.static('Public') was uploaded")
app.use(cors()); // Initialize MiddleWare
console.log("using cors")
app.use(bodyParser.urlencoded({extended: true})); // MiddleWare parsing Url-Encoded Data from incoming requests
app.use(express.json()); // MiddleWare for parsing JSON payloads from incoming requests


///////////////////////////////////////////////////////
const productRoutes = require('./Routes/product.js');
app.use('/', productRoutes);
console.log("app.use / as productRoutes")
///////////////////////////////////////////////////////

// Main Server Listening Port
app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});