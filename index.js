const express = require('express');
const app = express();

// view engine ro'yhatga olish
app.set('view engine', 'ejs');
// app.set('views', 'anotherfolder');

// static middleware
app.use(express.static('public'));

// Kitoblar ro'yhati
const books = [
    {
        id: 1,
        title: "Clean Code",
        year: "2008",
    },
    {
        id: 2,
        title: "Code Complete",
        year: "1993",
    },
    {
        id: 3,
        title: "The art of Thinking Clearly",
        year: "2013",
    },
];

// home route
app.get('/', (req, res) => {
    res.render('index', { title: 'Home', books });
});

// about route
app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

// create new book route
app.get('/books/create', (req, res) => {
    res.render('create', { title: 'Create a new Book' });
});

// not found route
app.use((req, res) => {
    res.status(404).render('notfound', { title: 'Not Found' });
})

// so'rovlarni ma'lum portda eshitish
const PORT = 5000;
app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));