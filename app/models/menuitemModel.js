const mongoose = require('mongoose');

const menuitemSchema = mongoose.Schema({
     id: {
        type: String,
    },
    menuId: {
        type: String,
        required: true,
    },
    fooditemId: {
        type: String,
        required: true,
    },
    fooditemName: {
        type: String,
        required: true,
    },
    fooditemImage: {
        type: String,
        required: true,
    },
    fooditemPrice: {
        type: Number,
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

const MenuitemModel = mongoose.model('MenuItems', menuitemSchema);

module.exports = MenuitemModel;