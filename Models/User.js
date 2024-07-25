/***********************************************************************************************************************
 *  Server Side - Models - User.js
 *  User Model Main Schema
 **********************************************************************************************************************/

const mongoose = require('mongoose'); // Import mongoose library
const Schema = mongoose.Schema; // Import mongoose Schema
const bcrypt = require("bcrypt"); // Import encryption library for user's password

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



/***
 * Regex explanation for validating password format:
 * - ^ := Assert the start of the string
 * - (?=.*[a-z]) := Ensure at least one lowercase letter
 * - (?=.*[A-Z]) := Ensure at least one uppercase letter
 * - (?=.*\d) := Ensure at least one digit
 * - (?=.*[@$!%*?&]) := Ensure at least one special character
 * - [A-Za-z\d@$!%*?&] := Allowable characters
 * - {8,32} := Ensure the length is between 8 and 32 characters
 * - $ := Assert the end of the string
 */

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,32}$/

const userSchema = new Schema({
    emailAddress: { // User emailAddress will be used as a unique key for his account
        type: String,
        required: true,
        unique: true,
        validate: { // Create a validator field for field's value
            validator: (email) => emailRegex.test(email),
            message: props => `${props.value} is not a valid email address`,
        }
    },
    password: { // User's password 
        type: String,
        required: true,
        validate: { // Create a validator field for field's value
            validator: (password) => passwordRegex.test(password),
            message: props => `Password must be between 8-32 characters and includes at lease one lowercase letter,
                               one uppercase letter, one number, and one special character`,
        }
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

// Define encryption password hashing (encryption from the server to the MongoDB by password hashing) with middleware
userSchema.pre('save', async function (next) {
    // If this current document is modified with the field password (existed or a new password)
    if (this.isModified('password' || this.isNew)) {

        // Do hash encryption for password field with a cost factor of hash function in 2^10 iterations to crack a character within
        const hash = await bcrypt.hash(this.password, 10);
        this.password = await hash; // Re-assign password field with encryption
    }
    next(); // Calling the next function to proceed with the save operation
});

module.exports = mongoose.model("User", userSchema); // Export the model to other files
