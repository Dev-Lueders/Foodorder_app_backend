const mongoose = require('mongoose');
const { default: UserModel } = require('./userModel');

const userSessionSchema = mongoose.Schema({
    id: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true,
    },
    sessionToken: {
        type: String,
        default: null
    },
    isActive:{
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

const UserSessionModel = mongoose.model('UserSessions', userSessionSchema);

module.exports = UserSessionModel;