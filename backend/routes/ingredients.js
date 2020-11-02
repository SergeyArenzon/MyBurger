const router = require('express').Router();
let Ingredients = require('../models/ingredients.model');

//                      //
//  /ingredient ROUTE   //
//                      //

router.route('/').get((req, res) => {
    let getIngredients = async function (){
        let ingredients = await Ingredients.find({});
        res.json(ingredients)
    }

    getIngredients()

})

module.exports = router;
