// @route api/orders
const router = require("express").Router();
const Order = require("../models/order.model");
const auth = require("../middleware/auth");

// router.route("/add", auth).post((req, res) => {
//     console.log(req.body);
//     const newOrder = new Order(req.body);
//     newOrder
//         .save()
//         .then(() => res.json("Order added!"))
//         .catch((err) => res.status(400).json("Error: " + err));
// });

router.post("/add", auth, (req, res) => {
    console.log(req.body);
    const newOrder = new Order(req.body);
    newOrder['createdAt'] = Date.now();
    newOrder
        .save()
        .then(() => res.json("Order added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/",  (req, res) => {
    const userId = req.query.userId;
    // console.log(req)
    Order.find({ userId: userId }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);

            res.json(result);
        }
    });
});

module.exports = router;
