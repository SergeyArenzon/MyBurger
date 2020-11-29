// @ route POST api/users

const router = require("express").Router();
let User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.route("/add").post((req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ msg: "Please enter all field", source: "/user/add route" });
    }

    User.findOne({ email }).then((user) => {
        if (user) {
            return res
                .status(400)
                .json({ msg: "User already exist", source: "/user/add route" });
        } else {
            const newUser = new User({
                email,
                password,
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }

                    const jwtSecretKey = process.env.JWT_SECRET;
                    newUser.password = hash;
                    newUser.save().then((user) => {
                        jwt.sign(
                            {
                                id: user.id,
                            },
                            jwtSecretKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) {
                                    throw err;
                                }
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        email: user.email,
                                    },
                                });
                            }
                        );
                    });
                });
            });
        }
    });
});

router.route("/").get((req, res) => {
    User.find({}, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

module.exports = router;
