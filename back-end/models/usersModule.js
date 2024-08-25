const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true
        }
    },
    {
        timestmaps: true
    }
)

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;