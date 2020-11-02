const router = require('express').Router();
let Ingredients = require('../models/ingredients.model');

//                      //
//  /ingredient ROUTE   //
//                      //

router.route('/').get((req, res) => {
    let getIngredients = async function (){
        let ingredients = await Ingredients.find({});

        let fixedIngredients = {};
        ingredients.map(ing => {
            fixedIngredients[ing['name']] = ing['number'];
        })

        res.json(fixedIngredients)       
        }
        
        

        
    getIngredients()

})

module.exports = router;
