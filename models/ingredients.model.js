
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ingredientSchema = new Schema({
    name: String,
    number: Number

})

const Ingredient = mongoose.model('ingredients', ingredientSchema);

module.exports = Ingredient;