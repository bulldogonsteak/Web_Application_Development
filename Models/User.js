/***********************************************************************************************************************
 *  Server Side - Models - User.js
 *  User Model Main Schema
 **********************************************************************************************************************/

const mongoose = require('mongoose'); // Import mongoose library
const Schema = mongoose.Schema; // Import mongoose Schema


const userSchema = new Schema({
    emailAddress: { // User emailAddress will be used as a unique key for his account
        type: String,
        required: true,
        unique: true,
    },
    password: { // User's password // TODO need to add additional encryptions for password high security level
        type: String,
        required: true,
    },
    firstName: { // User's First Name
        type: String,
        required: true,
    },
    lastName: { // User's Last Name
        type: String,
        required: true,
    },
    country: { // The country where the user lives
        type: String, // select from a list of countries
        required: true,
    },
    agreedToTermsPolicy: { // User's agreement to the terms of use and the privacy policy
        type: Boolean,
        required: true,
    },

});

module.exports = mongoose.model("User", userSchema); // Export the model to other files
