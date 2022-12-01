const {
    createUser,
    login,
} = require("../controller/AuthController");
const { checkUser } = require("../middleware/authMiddleware");
const { testeGet } = require("../service/testeService")

const router = require("express").Router();
//login
router.post("/checkUser", checkUser);
router.post("/createUser", createUser);
router.post("/login", login);
router.get("/teste", testeGet);

module.exports = router;