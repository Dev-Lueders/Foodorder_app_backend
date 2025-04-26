const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({

    id: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"restaurants",
    },
orderTotalPrice: {
    type: Number,
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
    },
});

const CartModel = mongoose.model('Cart', cartSchema, 'carts');

module.exports = CartModel;