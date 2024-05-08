const express = require('express');
const app = express();

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
    res.send(books);
});

// Bitta kitobni olishga mo'ljallangan route
app.get('/api/books/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) res.status(404).send("Afsuski kitob topilmadi!");
    res.send(book);
});

// Portni listen qilish
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`${port} - portni eshitishni boshladim...`);
});