const express = require('express');
const app = express();
const Joi = require('joi');

// Middleware
app.use(express.json()); // ushbu middleware funksiya, backend'ga kelgan so'rovlarni json ko'rinishidan o'qib olish uchun ishlatilgan

// Ma'lumotlar ombori
const books = [
    {
        id: 1,
        name: "Clean Code",
        year: "2008",
        author: "Robert Cecil Martin",
    },
    {
        id: 2,
        name: "Code Complete",
        year: "1993",
        author: "Steve McConnell",
    },
    {
        id: 3,
        name: "The art of Thinking Clearly",
        year: "2013",
        author: "Rolf Dobelli",
    },
];

// Routes
// Asosiy route
app.get('/', (_, res) => {
    res.send("Bosh sahifa");
});

// Barcha kitoblarni olishga mo'ljallangan route
app.get('/api/books', (req, res) => {
    // Barcha kitoblar ro'yhatini clientga qaytarish
    res.status(200).send(books);
});

// Bitta kitobni olishga mo'ljallangan route
app.get('/api/books/:id', (req, res) => {
    // Ma'lumotlar omboridan kitobni izlab topish
    const book = books.find(book => book.id === parseInt(req.params.id));
    // Izlash natijasida kitob topilmasa
    if (!book) return res.status(404).send("Afsuski kitob topilmadi!");
    // Topilgan kitobni clientga qaytarib berish
    res.status(200).send(book);
});

// Ma'lumotlar omboriga yangi kitob qo'shishga mo'ljallangan route
app.post('/api/books', (req, res) => {
    // Serverga kelgan so'rovni tekshirish
    const { error } = validateFunction(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Agar validatsiya jarayonida hech qanday xato kuzatilmasa, u holda yangi kitob obyetki tuziladi
    const newBook = {
        id: books.length + 1,
        name: req.body.name, // ushbu holatda request'ni body'sida ma'lumotlar json ko'rinishida bo'ladi
        year: req.body.year,
        author: req.body.author,
    };

    // Hosil bo'lgan yangi kitob obyektini kitoblar ro'yhatiga qo'shish
    books.push(newBook);

    // Clientga yangi kitobni qaytarish
    res.status(201).send(newBook);
});

// Ma'lumotlar omboridagi mavjud kitobni yangilash
app.put('/api/books/:id', (req, res) => {
    // Yangilanishi kerak bo'lgan kitobni izlab topish
    const book = books.find(book => book.id === parseInt(req.params.id));

    // Izlash natijasida kitob topilmasa
    if (!book) return res.status(404).send("Afsuski kitob topilmadi!");

    // Yangi kitob ma'lumotlarini validatsiya qilish
    const { error } = validateFunction(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Kitobni yangilash
    book.name = req.body.name;
    book.year = req.body.year;
    book.author = req.body.author;

    // Clientga yangilangan kitobni qaytarish
    res.status(200).send(book);
});

// Ko'rsatilgan kitobni ma'lumotlar omboridan o'chirib yuborish
app.delete('/api/books/:id', (req, res) => {
    // Ko'rsatilgan kitobni index'ni izlab topish
    const deletedBook = books.find(book => book.id === parseInt(req.params.id));
    if (!deletedBook) return res.status(404).send("Afsuski kitob topilmadi!");

    // Topilgan kitobni ma'lumotlar omboridan uning index'si yordamida o'chirib yuborish
    const idx = books.indexOf(deletedBook);
    books.splice(idx, 1);

    // O'chirib yuborilgan kitobni clientga qaytarish
    res.status(200).send(deletedBook);
});

// Validate funksiyasi
const validateFunction = (book) => {
    // Validate schema - sxemada obyektni qanday xossalari bo’lishi kerakligi va o’sha xossalarni turlari qanaqa bo’lishi, xossani qiymati eng kamida qancha bo’lishi yoki eng uzog’i bilan qancha bo’lishi ko'rsatib o'tiladi.
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(30),
        year: Joi.number().required(),
        author: Joi.string().required().min(2).max(30),
    });

    // Validatsiya natijasini funksiyaga qaytarish
    return schema.validate(book);
};

// Portni listen qilish
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`${port} - portni eshitishni boshladim...`);
});