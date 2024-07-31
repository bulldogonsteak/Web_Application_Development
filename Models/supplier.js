/***********************************************************************************************************************
 *  Server Side - Models - supplier.js
 *  Supplier Model Main Schema
 **********************************************************************************************************************/


// Imported Files
const mongoose = require('mongoose'); // Import mongoose library
const Schema = mongoose.Schema; // Import mongoose Schema


// supplier Model Schema
const supplierSchema = new Schema({
    _id: { // Override MongoDB _id index
        type: String,
        required: true,
        unique: true,
    },
    Supplier_ID: { // supplier ID
        type: String,
        required: true,
        unique: true,
    },
    Company_name: { // Company's name
        type: String,
        required: true,
    },
    Contact_name: { // Contact Supplier name
        type: String,
        required: true,
    },
    Address:{ // Supplier's main address
        type: String,
        required: true,
    },
    Supplier_phone:{ // Supplier's phone
        type: String,
        required: true,
    },
})