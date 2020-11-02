const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ingredientSchema = new Schema({
    name: String,
    number: Number
})

const Ingredient = mongoose.model('Ingredients', ingredientSchema);

module.exports = Ingredient;