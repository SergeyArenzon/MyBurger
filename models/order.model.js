const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: String,
    ingredients: Object,
    orderData: Object,
    price: Number,
    createdAt: Date
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
