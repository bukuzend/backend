const router = require('express').Router();

const authController = require("../Controllers/authController");

router.post("/login", authController.postLogin);
router.post("/register", authController.postRegister);

module.exports = router;
