const express = require("express");
const {
    signUpFunction,
    signInFunction,
    getAuth,
    deleteFromBasket,
    incAndDecFunction
} = require("../controllers/authController");
const authentication = require("../middleware/authentication");
const router = express.Router();

router.post("/signup", signUpFunction);
router.post("/signin", signInFunction);
router.get("/", authentication, getAuth);
router.put("/:userId/basket/:id", incAndDecFunction);
router.delete("/:userId/basket/:bookId", deleteFromBasket);

module.exports = router;