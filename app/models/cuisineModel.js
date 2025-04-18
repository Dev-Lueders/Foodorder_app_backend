const mongoose = require('mongoose');

const cuisineSchema = mongoose.Schema({
     id: {
        type: mongoose.Schema.Types.ObjectId,

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
        default: new Date(),
    },
    updatedTs: {
        type: Date,
        default: new Date(),
    }
});

const CuisineModel = mongoose.model('Cuisines', cuisineSchema);

module.exports = CuisineModel;