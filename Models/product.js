/***********************************************************************************************************************
 *  Server Side - Models - productController.js
 *  Product Model Main Schema
 **********************************************************************************************************************/

const mongoose = require('mongoose'); // Import mongoose library
const Schema = mongoose.Schema; // Import mongoose Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        // Default?
    },
    price: {
        type: Number,
        required: true,
    }
    /// Should use more fields according to the Client - Side
})