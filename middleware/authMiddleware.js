const AuthModel = require("../model/authModel");
const jwt = require("jsonwebtoken");
const { SECRET_PHRASE } = require("../utils/constants");

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, SECRET_PHRASE, async(err, decodedToken) => {
            if (err) {
                res.json({ status: false });
                next();
            } else {
                const user = await AuthModel.findUserByDecoded(decodedToken.id);
                if (user) res.json({ status: true, user: user[0].nm_user });
                else res.json({ status: false });
                next();
            }
        });
    } else {
        res.json({ status: false });
        next();
    }
};