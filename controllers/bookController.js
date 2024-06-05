const Books = require("../model/bookModel");
const Joi = require('joi');

const getAllBooksFunc = async (req, res) => {
    try {
        const { nomi } = req.query;
        const nomiRegEx = new RegExp(nomi, "i");
        const books = await Books
            .find({ nomi: nomiRegEx });

        // Barcha kitoblar ro'yhatini clientga qaytarish
        res.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);;
    }
};

const getOneBookFunc = async (req, res) => {
    try {
        const id = req.params.id;
        // Ma'lumotlar omboridan kitobni izlab topish
        const book = await Books.findById(id);
        // Izlash natijasida kitob topilmasa
        if (!book) return res.status(404).send("Afsuski kitob topilmadi!");
        // Topilgan kitobni clientga qaytarib berish
        res.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};

const createNewBookFunc = async (req, res) => {
    try {
        // Serverga kelgan so'rovni tekshirish
        const { error } = validateFunction(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Agar validatsiya jarayonida hech qanday xato kuzatilmasa, u holda yangi kitob obyetki tuziladi
        const newBook = new Books(req.body);

        // Hosil bo'lgan yangi kitob obyektini kitoblar ro'yhatiga qo'shish
        await newBook.save();

        // Clientga yangi kitobni qaytarish
        res.status(201).send(newBook);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};

const updateBookFunc = async (req, res) => {
    try {
        const id = req.params.id;

        // Yangi kitob ma'lumotlarini validatsiya qilish
        const { error } = validateFunction(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Kitobni yangilash
        const updatedBook = await Books.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) return res.status(404).send("Afsuski kitob topilmadi!");

        // Clientga yangilangan kitobni qaytarish
        res.status(200).send(updatedBook);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};

const deleteBookFunc = async (req, res) => {
    try {
        // Ko'rsatilgan kitobni index'ni izlab topish
        const deletedBook = await Books.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).send("Afsuski kitob topilmadi!");

        // O'chirib yuborilgan kitobni clientga qaytarish
        res.status(200).send(deletedBook);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};

// Validate funksiyasi
const validateFunction = (book) => {
    // Validate schema - sxemada obyektni qanday xossalari bo’lishi kerakligi va o’sha xossalarni turlari qanaqa bo’lishi, xossani qiymati eng kamida qancha bo’lishi yoki eng uzog’i bilan qancha bo’lishi ko'rsatib o'tiladi.
    const schema = Joi.object({
        nomi: Joi.string().required().min(3).max(30),
        narxi: Joi.number(),
        avtor: Joi.array(),
    });

    // Validatsiya natijasini funksiyaga qaytarish
    return schema.validate(book);
};

module.exports = {
    getAllBooksFunc,
    getOneBookFunc,
    createNewBookFunc,
    updateBookFunc,
    deleteBookFunc,
};