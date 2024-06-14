const express = require("express");
const { signUpFunction, signInFunction, getAuth } = require("../controllers/authController");
const authentication = require("../middleware/authentication");
const router = express.Router();

router.post("/signup", signUpFunction);
router.post("/signin", signInFunction);
router.get("/", authentication, getAuth);

module.exports = router;