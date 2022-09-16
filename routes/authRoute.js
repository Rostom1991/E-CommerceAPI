const { signUp, login } = require("../controllers/authController");

const router = require("express").Router();

//SIGN-UP

router.post("/signup", signUp);

//LOGIN
router.post("/login", login);

module.exports = router;
