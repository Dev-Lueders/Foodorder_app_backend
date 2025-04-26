const mongoose = require('mongoose');

const cuisineSchema = mongoose.Schema({
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
    isActive: {
        type: Boolean,
        default: true,
    },
    createdTs: {
        type: Date,
        default: Date.now,
    },
    updatedTs: {
        type: Date,
        default: Date.now,
    }
});

const CuisineModel = mongoose.model('Cuisines', cuisineSchema);

module.exports = CuisineModel;