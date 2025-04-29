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
        type: mongoose.Schema.Types.ObjectId, 
      ref:'category'  
    },
    cuisineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'cuisine'
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