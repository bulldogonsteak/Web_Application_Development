/***********************************************************************************************************************
 *  Server Side - Models - User.js
 *  User Model Main Schema
 **********************************************************************************************************************/

const mongoose = require('mongoose'); // Import mongoose library
const Schema = mongoose.Schema; // Import mongoose Schema
require('mongoose-type-email');

const userSchema = new Schema({
    emailAddress: {
        type: String,
        required: true,
        unique: true,
    },
    password: { // User's password // TODO need to add additional encryptions for password high security level


    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    country: {
        type: String, // select from a list of countries
        required: true,
    },
    agreedToTermsPolicy: { // Have to agree to Terms and Privacy policty
        type: Boolean,
        required: true,
    },


})
