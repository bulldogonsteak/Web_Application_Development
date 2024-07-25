/***********************************************************************************************************************
 *  Server Side - Models - User.js
 *  User Model Main Schema
 **********************************************************************************************************************/

const mongoose = require('mongoose'); // Import mongoose library
const Schema = mongoose.Schema; // Import mongoose Schema

/***
 * @brief:
 * /^[^\s@]+@[^\s@]+\.com$/ :=
 * - `^` := Assert the start of the string
 * - `[^\s@]` := Matches one or more characters that are neither whitespace nor `@`.
 * - `+` := Concatenate string classes
 * `.com$` := String ends with the suffix (ending) of .com
 *
 * @example:
 * const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 * const testEmail = (email) => emailRegex.test(email);
 *
 * console.log(testEmail("example@example.com")); /// true
 * console.log(testEmail("invalid-email")); /// false
 *
 ***/
const emailRegex = /^[^\s@]+@[^\s@]+\.com$/; // Regex expression to insure email template is inserted

const userSchema = new Schema({
    emailAddress: { // User emailAddress will be used as a unique key for his account
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => {
                return emailRegex.test(email);
            },
            message: props => `${props.value} is not a valid email address`,
        }
    },
    password: { // User's password 
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
