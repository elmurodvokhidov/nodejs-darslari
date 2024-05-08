const express = require('express');
const app = express();

// Route Params - ular yordamida asosiy ma'lumot olinadi.
app.get('/api/books/:id', (req, res) => {
    res.send(req.params);
});

// Multiple Route Params
app.get('/api/books/:year/:month', (req, res) => {
    res.send(req.params);
});

// Query String Params - ular yordamida backend'dan qo'shimcha ma'lumot olinadi.
app.get('/api/books', (req, res) => {
    res.send(req.query);
});

// Portni listen qilish
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`${port} - portni eshitishni boshladim...`);
});