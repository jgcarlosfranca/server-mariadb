const AuthModel = require("../model/AuthModel");
const jwt = require("jsonwebtoken");
const { MAX_TIME_EXPIRED_TOKEN, SECRET_PHRASE } = require("../utils/constants");

const createToken = (id) => {
    return jwt.sign({ id }, SECRET_PHRASE, {
        expiresIn: MAX_TIME_EXPIRED_TOKEN,
    });
};

const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    console.log(err);
    if (err.message === "incorrect email") {
        errors.email = "That email is not registered";
    }

    if (err.message === "incorrect password") {
        errors.password = "That password is incorrect";
    }

    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

module.exports.createUser = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await AuthModel.createUser(email, password);
        const token = createToken(user.id_user);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: MAX_TIME_EXPIRED_TOKEN * 1000,
        });

        res.status(201).json({ user: user.id_user, created: true });
    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
};

module.exports.login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AuthModel.getLogin(email, password);
        const token = createToken(user[0].id_user);
        res.cookie("jwt", token, {
            httpOnly: false,
            maxAge: MAX_TIME_EXPIRED_TOKEN * 1000,
        });
        res.status(200).json({ user: user[0].id_user, status: true });
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, status: false });
    }
};

module.exports.testeQuery = async(req, res) => {
    try {
        const user = await AuthModel.getMySQLQuery();
        res.status(200).json({ user: user, status: true });
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, status: false });
    }
};


module.exports.testeQueryGet = async(req, res) => {
    try {

        // localhost:3000/testeQuery?atrr=valor&animal=cao
        const atributo = req.query.atrr
        const animal = req.query.animal
        res.status(200).json({ user: user, status: true });
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, status: false });
    }
};