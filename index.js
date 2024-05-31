const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // import dotenv from "dotenv"; // dotenv.config();
const app = express();

// Ma'lumotlar omboriga saqlanishi kerak bo'lgan kitob sxemasi
const kitobSxemasi = mongoose.Schema({
    nomi: String,
    narxi: Number,
    avtor: [String],
});

// Sxema asosida tuzilgan model, u bizga class qaytarib beradi
const Kitob = mongoose.model("kitob", kitobSxemasi);

// Class asosida yangi kitob yaratish va uni ma'lumotlar omboriga saqlash
const yangiKitobYaratish = async (kitob) => {
    const yangiKitob = new Kitob(kitob);

    // Kitob ma'lumotlarini database ga saqlash
    await yangiKitob.save();
};

// Yangi kitob ma'lumotlari
yangiKitobYaratish(
    {
        nomi: "Zamonaviy Robinzon",
        narxi: 8000,
        avtor: ["toshmat"]
    }
);

const port = process.env.PORT || 5100
mongoose.connect(process.env.CONN_STR)
    .then(() => {
        console.log("MongoDb ga ulanish hosil qilindi...");
        app.listen(port, () => console.log(`${port} ni eshitishni boshladim...`));
    })
    .catch((err) => console.log("MongoDb ga ulanishda XATOLIK: " + err));