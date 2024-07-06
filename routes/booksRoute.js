const express = require('express');
const router = express.Router();
const {
    getAllBooksFunc,
    getOneBookFunc,
    createNewBookFunc,
    updateBookFunc,
    deleteBookFunc,
    addToBasketFunc,
    addCommentFunc,
} = require('../controllers/bookController');
const authentication = require('../middleware/authentication');


// Barcha kitoblarni olishga mo'ljallangan route
router.get('/', getAllBooksFunc);
// Bitta kitobni olishga mo'ljallangan route
router.get('/:id', getOneBookFunc);
// Ma'lumotlar omboriga yangi kitob qo'shishga mo'ljallangan route
router.post('/', authentication, createNewBookFunc);
// Ma'lumotlar omboridagi mavjud kitobni yangilash
router.put('/:id', updateBookFunc);
// Ko'rsatilgan kitobni ma'lumotlar omboridan o'chirib yuborish
router.delete('/:id', deleteBookFunc);
// Berilgan kitobni foydalanuvchi savatiga joylash
router.post('/:userId/:bookId', addToBasketFunc);
// Kitobga sharh yozish
router.put('/comment/:id', addCommentFunc);


// Routerni export qilish
module.exports = router;