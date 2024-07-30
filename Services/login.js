/***********************************************************************************************************************
 *  Server Side - Services - Login.js
 *  Login Services Methods
 **********************************************************************************************************************/

// Imported Files
const User = require('../Models/User.js'); // Import Login Model
const bcrypt = require('bcrypt'); // Import encryption Library
const mongoose = require('mongoose');

// Defined Regex according to the Model
const emailRegex = /^[^\s@]+@[^\s@]+\.com$/; // Email Regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,32}$/; // Password Regex

// Function to check validity of email - should be synchronous - needs to finish validation checks and then proceed
function isEmailValid(email) {
    return emailRegex.test(email);
}

// Function to check validity of password
// Should be synchronous - needs to finish validation checks and then proceed
function isPasswordValid(password) {
    return passwordRegex.test(password);
}

// Function to register a new Login to the system
// Should be asynchronous - not to delay client interaction with the server while the server communicates with the DB
async function register(userData) {

    // Validity Checks to insure valid Data
    if (!isEmailValid(userData.emailAddress)) {
        console.log('UserData (register) Email is invalid'); // TODO self-debugging
        throw new Error('UserData Email is invalid');
    }

    if (!isPasswordValid(userData.password)) {
        console.log('UserData (register) password is invalid'); // TODO self-debugging
        throw new Error('UserData password is invalid');
    }

    // Check if the user is already registered
    const isUserExists = await User.findOne({emailAddress: userData.emailAddress});

    // In Case the user is Exist
    if (isUserExists) {
        console.log(`User already exists`); // TODO self-debugging
        throw new Error(`User already exists`);
    }

    // The Login is new to the system
    const newUser = new User(userData)
    newUser._id = userData.emailAddress;
    return await newUser.save(); // Save Login's data within DB
     // return the newUser info
}


// Function to log in a user to the system with the given means of identification
async function login(emailAddress, password) {
    // Validity Checks to insure valid Data
    if (!isEmailValid(emailAddress)) {
        console.log('UserData (login) Email is invalid'); // TODO self-debugging
        throw new Error('UserData Email is invalid');
    }

    if (!isPasswordValid(password)) {
        console.log('Login (login) password is invalid'); // TODO self-debugging
        throw new Error(`User's password is invalid`);
    }

    // Checks if the user exists in the system
    const isUserExists = await User.findOne({emailAddress: emailAddress});
    return isUserExists != null; // isUserExists != null ? true : false
}

// Function to check if user session is alive with the connection in the DB
const isUserSessionAlive = async (emailAddress) => {

    // Check if the user exists within the system
    const user = await User.findOne({emailAddress: emailAddress});

    // In case user is not found or his session is not active
    if(!user || !user.sessionId){
        return null;
    }

    // Returns user sessionId
    return user.sessionId;
}

module.exports = {
    register,
    login,
    isUserSessionAlive,
};

