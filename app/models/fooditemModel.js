const mongoose = require('mongoose');

const fooditemSchema = mongoose.Schema({
     id: {
        type: String,
        required: true,
         unique: true,

    },
 
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
        required: true,
    },
    cuisineId: {
        type: String,
        required: true,
    },
    isVeg: {
        type: Boolean,
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

const FooditemModel = mongoose.model('Fooditems', fooditemSchema);

module.exports = FooditemModel;