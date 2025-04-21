const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    // id: {
    //     type: String,

    // },
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
    createdTs: {
        type: Date,
        default: new Date(),
    },
    updatedTs: {
        type: Date,
        default: new Date(),
    }
});

const RestaurantModel = mongoose.model('Restaurants', restaurantSchema);

module.exports = RestaurantModel;