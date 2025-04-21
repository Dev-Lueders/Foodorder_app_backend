const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    
    {
        // id: {
        // type: String,
        // },
        username: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
      
        password: {
            type: String,
            required: true,
        },
//   phoneNo: {
//             type: String,
//         },

        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        isActive:{
            type: Boolean,
            default: true,
        },
        createdTs: {
            type: Date,
            default: new Date()
        },
        updatedTs: {
            type: Date,
            default: new Date()
        }
    }
);

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;