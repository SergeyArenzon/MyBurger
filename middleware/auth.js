const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header("x-auth-token");
    // console.log(req)
    // Check for token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorizaztion denied" });
    }

    try {
        // Verify token
        const jwtSecretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, jwtSecretKey);
        // Add user from payload
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: "Token is not valid" });
    }
}

module.exports = auth;
