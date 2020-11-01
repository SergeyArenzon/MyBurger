const router = require('express').Router();
let Order = require('../models/order.model');

router.route('/add').post((req, res) => {

    console.log(req.body)
    const order = {
        ingredients : res.ingredients,
        price: res.totalPrice,
        address: {
            street: "Bareket",
            zipCode: "123"
    },
        email: "sergeyr1991@gmail.com"
    }   



    const newOrder = new Order(req.body);
    newOrder.save()
        .then(() => res.json('Order added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;
