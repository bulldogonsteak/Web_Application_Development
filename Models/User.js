/***********************************************************************************************************************
 *  Server Side - Models - User.js
 *  User Model Main Schema
 **********************************************************************************************************************/

const mongoose = require('mongoose'); // Import mongoose library
const Schema = mongoose.Schema; // Import mongoose Schema

const userSchema = new Schema({
    username: {
        type: String,
    }
})
