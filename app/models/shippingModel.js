const mongoose = require('mongoose');

const shippingSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    emailId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: true,
    },
    phoneNo: {
        type: Number,
    },
    isActive: {
        type: Boolean,
        default: true,
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

const shippingModel = mongoose.model('shipping', shippingSchema,'shippingdetails');

module.exports = shippingModel;