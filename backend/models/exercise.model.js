const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const exerciseSchema = new Schema({
    ingredients : [],
    price: Number,
    address: {
        street: String,
        zipCode: String
    },
    email: String
})

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;