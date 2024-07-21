const Books = require("../model/bookModel");
const Joi = require('joi');
const Auth = require("../model/authModel");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const getAllBooksFunc = async (req, res) => {
    try {
        const { nomi, cat } = req.query;
        const nomiRegEx = new RegExp(nomi, "i");

        let query = { nomi: nomiRegEx };

        if (cat) {
            if (ObjectId.isValid(cat)) {
                query.cat = new ObjectId(cat);
            } else {
                return res.status(400).json({ message: "Invalid category ID" });
            }
        }

        const books = await Books
            .find(query)
            .populate("avtor")
            .populate("cat");

        // Barcha kitoblar ro'yhatini clientga qaytarish
        res.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};

const getOneBookFunc = async (req, res) => {
    try {
        const id = req.params.id;
        // Ma'lumotlar omboridan kitobni izlab topish
        const book = await Books.findById(id).populate([
            { path: "comments.avtor" },
            { path: "avtor" },
            { path: "cat" },
        ]);
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
        const role = req.authRole;
        if (!role) return res.status(403).send("Sizga buni qilish taqiqlangan!");

        // Serverga kelgan so'rovni tekshirish
        const { error } = validateFunction(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Agar validatsiya jarayonida hech qanday xato kuzatilmasa, u holda yangi kitob obyetki tuziladi
        const newBook = new Books(req.body);

        // Hosil bo'lgan yangi kitob obyektini kitoblar ro'yhatiga qo'shish
        await newBook.save();

        // Clientga yangi kitobni qaytarish
        res.status(201).json({ data: newBook, message: "Yangi kitob qo'shildi" });
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

const addToBasketFunc = async (req, res) => {
    try {
        const { userId, bookId, count } = req.params;
        const user = await Auth.findById(userId);
        user.basket.push({ book: bookId, count });
        await user.save();
        res.status(200).json({ message: "Muvaffaqiyatli saqlandi" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};

const addCommentFunc = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, rating, avtor } = req.body;

        const foundBook = await Books.findById(id)
        foundBook.comments.push({ text, rating, avtor });
        await foundBook.save();
        await foundBook.populate([
            { path: "comments.avtor" },
            { path: "avtor" },
            { path: "cat" },
        ]);
        res.status(200).json({ data: foundBook, message: "Muvaffaqiyatli saqlandi" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};

const toggleLikeFunc = async (req, res) => {
    try {
        const { userId, bookId } = req.params;
        const user = await Auth.findById(userId);
        const existingBook = user.wishlist.find(item => item.toString() === bookId);
        if (existingBook) {
            user.wishlist = user.wishlist.filter(item => item.toString() !== bookId);
        }
        else {
            user.wishlist.push(bookId);
        }
        await user.save();
        res.status(200).json({ message: "Muvaffaqiyatli saqlandi" });
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
        cat: Joi.string(),
        img: Joi.string(),
        description: Joi.string(),
        avtor: Joi.string(),
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
    addToBasketFunc,
    addCommentFunc,
    toggleLikeFunc,
};