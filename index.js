const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const authentication = require('./middleware/authentication');
const books = require('./routes/booksRoute');
const categories = require('./routes/categoryRoute');
const auths = require('./routes/authRoute');
require("dotenv").config();

// Middleware
app.use(express.json()); // ushbu middleware funksiya, backend'ga kelgan so'rovlarni json ko'rinishidan o'qib olish uchun ishlatilgan

// Custom middleware
app.use(authentication); // ushbu funksiya, custom middleware tuzishni o'rganish maqsadida yozilgan

// Built in middleware
app.use(express.static('public')); // funksiyaga berilgan papka manzili o'sha papkani static ravishda o'qish imkonini beradi
// masalan, papka ichida fayllarga so'rov jo'natish orqali ularni o'qib olish mumkin, http://localhost:5000/readme.txt

// Third party middleware
app.use(helmet()); // helmet - express dasturimizni xavfsizligini oshrishga yordam beradigan middleware funksiya
if (app.get('env') === 'development') { // process.env.NODE_ENV
    app.use(cors()); // cors - express dasturimizda client tomondan server resurslarini so'rash imkonini beradi
};

// View engine
app.set('view engine', 'pug'); // bu bilan express dasturimizda view engine sifatida pug paketi ishlatilishini belgilab qo'yilgan

// Books obyektini router sifatida ishlatish
app.use('/api/books', books);
app.use('/api/category', categories);
app.use('/api/auth', auths);

// Routes
// Asosiy route
app.get('/', (_, res) => {
    res.render('index', { title: "Book Store | Home", text: "Book Store 📚" });
});

const port = process.env.PORT || 5100;
mongoose.connect(process.env.CONN_STR)
    .then(() => {
        console.log("MongoDb ga ulanish hosil qilindi...");
        app.listen(port, () => console.log(`${port} ni eshitishni boshladim...`));
    })
    .catch((err) => console.log("MongoDb ga ulanishda XATOLIK: " + err));