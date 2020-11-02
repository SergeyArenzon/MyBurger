const router = require('express').Router();
let Ingredients = require('../models/ingredients.model');

//                      //
//  /ingredient ROUTE   //
//                      //

router.route('/').get((req, res) => {
    let ingredients;

    let getIngredients = async function (){
        ingredients = await Ingredients.findById({});
        console.log(ingredients); // contains user object
    }

    console.log(ingredients)


    res.json({ingredients})
})


module.exports = router;
