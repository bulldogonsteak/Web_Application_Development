/***********************************************************************************************************************
 *  Server Side - Models - product.js
 *  Product Model Main Schema
 **********************************************************************************************************************/

// Imported Files
const mongoose = require('mongoose'); // Import mongoose library
const Schema = mongoose.Schema; // Import mongoose Schema

const productSchema = new Schema({
    _id: { // Override MongoDB _id index
        type: String,
        required: true,
        unique: true
    },
    productId: { // Product ID (injective key)
        type: String,
        required: true,
        unique: true,
    },
    name: { // Product's name
        type: String,
        required: true,
    },
    description: { // Product's description
        type: String,
        required: true,
    },
    // platform: { // Product's platform which will work on
    //     type: [String],
    //     required: true,
    // },
    // genre: { // Product's genre type
    //     type: String,
    //     required: true,
    // },
    // developer: { // Product's developer company
    //     type: String,
    //     required: true,
    // },
    // publisher: { // Product's publisher company
    //     type: String,
    //     required: true,
    // },
    // releaseDate: { // Product's release date to marketing
    //     type: Date,
    //     required: true,
    // },
    price: { // Product's price value
        type: Number, // TODO can be dollar need to check if it is string
        min: 0,
        required: true,
    },
    // discount: { // Product's discount ? discount : 0
    //     type: Number,
    //     min: 0,
    //     max: 100,
    //     default: 0,
    // },
    // stock: { // Product's availability within the stock market
    //     type: Number,
    //     min: 0,
    //     //required: true,
    // },
    // rating: { // Product's rating 0-5 limitation. 0 - very bad, 5 - very good
    //     type: Number,
    //     min: 0,
    //     max: 5,
    //     default: 0, // Default rating to product will be 0
    // },
    images: { // Product's images
        type: [String], // Array of URLs for images
        //required: true,
    },
    videos: { // Product's videos
        type: [String], // Array of URLs for videos
    },
    // reviews: [ // Array of objects Users and Comments about reviews
    //     {
    //         userName: String,
    //         rating: { // Username rating about the product
    //             type: Number,
    //             min: 0,
    //             max: 5,
    //         },
    //         comment: String, // Username comment about the product
    //         date: {
    //             type: Date,
    //             default: Date.now,
    //         },
    //     },
    // ],
    // tags: { // Tags which related to the product's type
    //     type: [String], // Array of tags for search-ability
    // }

})

const Product = mongoose.model('Product', productSchema);
module.exports = Product; // Exporting Product as a Schema to other files