// express'ni o'rnatish
// npm install express
const express = require('express');
const app = express();

// GET
// Root Route
app.get('/', (req, res) => {
    res.send("Bosh sahifa");
});

// All Books Route
app.get('/api/books', (req, res) => {
    res.send(['Clean Code', 'Code Complete', 'The art of Thinking Clearly']);
});

// Portni listen qilish
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`${port} - portni eshitishni boshladim...`);
});