const mongoose = require('mongoose');
const {userDB} = require('../config/db')

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
         type: String,
         required: true
    },
    password: {
        required: true,
        type: String
    },
    role: {
        type: String,
        roleBase: ["user", "admin"],
        default: "user"
    }
})

module.exports = userDB.model('User', userSchema);