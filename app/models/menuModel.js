const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    // id: {
    //     type: String,
    // },
    restaurantId: {
        type: String,
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
        default: new Date(),
    },
    updatedTs: {
        type: Date,
        default: new Date(),
    }
});

const MenuModel = mongoose.model('Menus', menuSchema);

module.exports = MenuModel;