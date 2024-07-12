const express = require("express");
const {
    signUpFunction,
    signInFunction,
    getAuth,
    deleteFromBasket,
    incAndDecFunction,
    verificateUser
} = require("../controllers/authController");
const authentication = require("../middleware/authentication");
const router = express.Router();

router.post("/signup", signUpFunction);
router.post("/signin", signInFunction);
router.get("/", authentication, getAuth);
router.put("/:userId/basket/:id", incAndDecFunction);
router.delete("/:userId/basket/:bookId", deleteFromBasket);
// todo: yangi route qo'shish lozim sababi email ga jo'natilgan link ga foydalanuvchi tashrif buyursa ma'lumot ko'rsatish uchun
router.get("/verify/:userId/:uniqueId", verificateUser);

module.exports = router;