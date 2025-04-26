const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    categoryId: {
      type: String,  
    },
    cuisineId: {
        type:String,
    },
    createdTs: {
        type: Date,
        default:Date.now,
    },
    updatedTs: {
        type: Date,
        default:Date.now,
    }
});

const RestaurantModel = mongoose.model('Restaurants', restaurantSchema);

module.exports = RestaurantModel;