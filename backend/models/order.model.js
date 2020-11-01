const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const orderSchema = new Schema({
    ingredients : Object,
    price: Number,
    address: {
        street: String,
        zipCode: String
    },
    email: String
})

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;