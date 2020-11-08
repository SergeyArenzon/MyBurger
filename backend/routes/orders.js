const router = require('express').Router();
let Order = require('../models/order.model');


router.route('/add').post((req, res) => {
    console.log(req.body)
    const newOrder = new Order(req.body);
    newOrder.save()
        .then(() => res.json('Order added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/').get((req, res) => {
    Order.find({}, (err, result) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(result);
            res.json(result);
        }
    })

})

module.exports = router;
