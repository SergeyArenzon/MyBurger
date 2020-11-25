const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('user', userSchema);

module.exports = User;