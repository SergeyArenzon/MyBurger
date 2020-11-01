const router = require('express').Router();
let Order = require('../models/order.model');

router.route('/add').post((req, res) => {
    const order = {
        ingredients : [1,2,3],
        price: 10,
        address: {
            street: "Bareket",
            zipCode: "123"
    },
        email: "sergeyr1991@gmail.com"
    }

    const newOrder = new Order({order});
    newOrder.save()
        .then(() => res.json('Order added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
//