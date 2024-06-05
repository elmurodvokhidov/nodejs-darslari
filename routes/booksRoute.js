const express = require('express');
const router = express.Router();
const {
    getAllBooksFunc,
    getOneBookFunc,
    createNewBookFunc,
    updateBookFunc,
    deleteBookFunc,
} = require('../controllers/bookController');


// Barcha kitoblarni olishga mo'ljallangan route
router.get('/', getAllBooksFunc);
// Bitta kitobni olishga mo'ljallangan route
router.get('/:id', getOneBookFunc);
// Ma'lumotlar omboriga yangi kitob qo'shishga mo'ljallangan route
router.post('/', createNewBookFunc);
// Ma'lumotlar omboridagi mavjud kitobni yangilash
router.put('/:id', updateBookFunc);
// Ko'rsatilgan kitobni ma'lumotlar omboridan o'chirib yuborish
router.delete('/:id', deleteBookFunc);


// Routerni export qilish
module.exports = router;