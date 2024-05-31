const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const Joi = require('joi');

// Ma'lumotlar omboriga saqlanishi kerak bo'lgan kitob sxemasi
const kitobSxemasi = mongoose.Schema({
    nomi: String,
    narxi: Number,
    avtor: [String],
});

// Sxema asosida tuzilgan model, u bizga class qaytarib beradi
const Kitob = mongoose.model("kitob", kitobSxemasi);

// Barcha kitoblarni olishga mo'ljallangan route
router.get('/', async (req, res) => {
    const books = await Kitob
        .find({ narxi: { $lt: 50 } })
        .select({ avtor: 0 })
        .limit(10);
    // .countDocuments();
    // Barcha kitoblar ro'yhatini clientga qaytarish
    res.status(200).json(books);
});

// Bitta kitobni olishga mo'ljallangan route
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    // Ma'lumotlar omboridan kitobni izlab topish
    // const book = await Kitob.findOne({ _id: id });
    const book = await Kitob.findById(id);
    // Izlash natijasida kitob topilmasa
    if (!book) return res.status(404).send("Afsuski kitob topilmadi!");
    // Topilgan kitobni clientga qaytarib berish
    res.status(200).send(book);
});

// Ma'lumotlar omboriga yangi kitob qo'shishga mo'ljallangan route
router.post('/', async (req, res) => {
    // Serverga kelgan so'rovni tekshirish
    const { error } = validateFunction(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Agar validatsiya jarayonida hech qanday xato kuzatilmasa, u holda yangi kitob obyetki tuziladi
    const newBook = new Kitob(req.body);

    // Hosil bo'lgan yangi kitob obyektini kitoblar ro'yhatiga qo'shish
    await newBook.save();

    // Clientga yangi kitobni qaytarish
    res.status(201).send(newBook);
});

// Ma'lumotlar omboridagi mavjud kitobni yangilash
// router.put('/:id', (req, res) => {
//     // Yangilanishi kerak bo'lgan kitobni izlab topish
//     const book = books.find(book => book.id === parseInt(req.params.id));

//     // Izlash natijasida kitob topilmasa
//     if (!book) return res.status(404).send("Afsuski kitob topilmadi!");

//     // Yangi kitob ma'lumotlarini validatsiya qilish
//     const { error } = validateFunction(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     // Kitobni yangilash
//     book.name = req.body.name;
//     book.year = req.body.year;
//     book.author = req.body.author;

//     // Clientga yangilangan kitobni qaytarish
//     res.status(200).send(book);
// });

// Ko'rsatilgan kitobni ma'lumotlar omboridan o'chirib yuborish
// router.delete('/:id', (req, res) => {
//     // Ko'rsatilgan kitobni index'ni izlab topish
//     const deletedBook = books.find(book => book.id === parseInt(req.params.id));
//     if (!deletedBook) return res.status(404).send("Afsuski kitob topilmadi!");

//     // Topilgan kitobni ma'lumotlar omboridan uning index'si yordamida o'chirib yuborish
//     const idx = books.indexOf(deletedBook);
//     books.splice(idx, 1);

//     // O'chirib yuborilgan kitobni clientga qaytarish
//     res.status(200).send(deletedBook);
// });

// Validate funksiyasi
const validateFunction = (book) => {
    // Validate schema - sxemada obyektni qanday xossalari bo’lishi kerakligi va o’sha xossalarni turlari qanaqa bo’lishi, xossani qiymati eng kamida qancha bo’lishi yoki eng uzog’i bilan qancha bo’lishi ko'rsatib o'tiladi.
    const schema = Joi.object({
        nomi: Joi.string().required().min(3).max(30),
        narxi: Joi.number().required(),
        avtor: Joi.array(),
    });

    // Validatsiya natijasini funksiyaga qaytarish
    return schema.validate(book);
};

// Routerni export qilish
module.exports = router;