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
require('custom-env').env(process.env.NODE_ENV,'./config');


// Create a server
const app = express();

app.use(express.static('public')); // Use Public as static file
app.use(cors()); // Initialize MiddleWare