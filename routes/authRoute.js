const express = require("express");
const {
    signUpFunction,
    signInFunction,
    getAuth,
    deleteFromBasket,
    incAndDecFunction,
    verificateUser,
    findUserByEmail,
    updatePassword,
    payment
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
router.post("/find-user-by-email", findUserByEmail);
router.put("/update-password/:userId/:uniqueId", updatePassword);
router.post("/payment", authentication, payment);

module.exports = router;