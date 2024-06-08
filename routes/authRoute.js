const express = require("express");
const { signUpFunction, signInFunction } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signUpFunction);
router.post("/signin", signInFunction);

module.exports = router;