const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();

// ! Middleware
// todo: Barcha middleware funksiyalar alohida modulda saqlanishi lozim
app.use(express.json()); // ushbu middleware funksiya, backend'ga kelgan so'rovlarni json ko'rinishidan o'qib olish uchun ishlatilgan

// // Custom middleware
// // app.use(authentication); // ushbu funksiya, custom middleware tuzishni o'rganish maqsadida yozilgan

// ! Built in middleware
app.use(express.static('public')); // funksiyaga berilgan papka manzili o'sha papkani static ravishda o'qish imkonini beradi
// masalan, papka ichida fayllarga so'rov jo'natish orqali ularni o'qib olish mumkin, http://localhost:5000/readme.txt
app.use(express.static('uploads'));

// ! Third party middleware
app.use(helmet()); // helmet - express dasturimizni xavfsizligini oshrishga yordam beradigan middleware funksiya
if (app.get('env') === 'development') { // process.env.NODE_ENV
    app.use(cors()); // cors - express dasturimizda client tomondan server resurslarini so'rash imkonini beradi
};

// View engine
// // app.set('view engine', 'pug'); // bu bilan express dasturimizda view engine sifatida pug paketi ishlatilishini belgilab qo'yilgan
// todo: Keyinchalik loyihada ixtiyoriy ravisha ejs view engine dan foydalaniladi
app.set('view engine', 'ejs');

// Books obyektini router sifatida ishlatish
app.use('/api/books', require('./routes/booksRoute'));
app.use('/api/category', require('./routes/categoryRoute'));
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/upload-image', require('./routes/imageRoute'));

// ! Routes
// Asosiy route
app.get('/', (_, res) => res.send("Hello World!"));

const port = process.env.PORT || 5100;

// todo: MongoDB ga ulanish hosil qilishni alohida modulda amalga oshirish maqsadga muvofiq
mongoose.connect(process.env.CONN_STR)
    .then(() => {
        console.log("MongoDb ga ulanish hosil qilindi...");
        app.listen(port, () => console.log(`${port} ni eshitishni boshladim...`));
    })
    .catch((err) => console.log("MongoDb ga ulanishda XATOLIK: " + err));