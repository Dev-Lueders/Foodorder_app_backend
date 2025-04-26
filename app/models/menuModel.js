const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    // id: {
    //     type: String,
    // },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"restaurants",
        required: true,
    },
    description: {
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

const MenuModel = mongoose.model('Menus', menuSchema);

module.exports = MenuModel;