const mongoose = require('mongoose');

const cartitemsSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    fooditemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "fooditems",
        required: true,
    },
    fooditemPrice: {
        type: Number,
        required: true,
    },
    unitsInStock: {
        type: Number,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
        required: true
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

const CartitemsModel = mongoose.model('Cartitems', cartitemsSchema, 'cartitems');

module.exports = CartitemsModel;