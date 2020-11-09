const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const orderSchema = new Schema({
    ingredients : Object,
    orderData: Object,
    price: Number,
    
})

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;