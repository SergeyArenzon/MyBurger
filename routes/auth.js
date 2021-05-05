const router = require("express").Router();
let User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

require("dotenv").config();

// @route POST api/auth
// @desc Auth user

router.route("/").post((req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ msg: "Please enter all field", source: "/auth route" });
    }

    User.findOne({ email }).then((user) => {
        if (!user) {
            return res
                .status(400)
                .json({ msg: "User doesnt exist", source: "/user/add route" });
        }
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ msg: "Invalid credentials", route: "/api/auth" });
            }

            const jwtSecretKey = process.env.JWT_SECRET;

            jwt.sign(
                {
                    id: user.id,
                },
                jwtSecretKey,
                { expiresIn: 60 },
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

// @route GET api/auth/user
// @desc Get user data
// @access Private

router.get("/user", auth, (req, res) => {
    User.findById(req.user.id)
        .select("-password")
        .then((user) => res.json(user));
});

module.exports = router;
