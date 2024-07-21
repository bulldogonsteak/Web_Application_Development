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

// Config Environment File path
require('custom-env').env(process.env.NODE_ENV, './config');

////////////////////////////////////////////////////////////////////
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB')
    })// Check if connection attend to succeed
    .catch(err => {
        console.log('Could not connect to MongoDB',err)
    });
/////////////////////////////////////////////////////////////////////////

// Create a server
const app = express();

app.use(express.static('public')); // Use Public as static file
app.use(cors()); // Initialize MiddleWare
app.use(bodyParser.urlencoded({extended: true})); // MiddleWare parsing Url-Encoded Data from incoming requests
app.use(express.json()); // MiddleWare for parsing JSON payloads from incoming requests


///////////////////////////////////////////////////////
const productRoutes = require('./Routes/product.js');
app.use('/products', productRoutes);
///////////////////////////////////////////////////////

// Main Server Listening Port
app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});