const mongoose = require("mongoose");

// Ma'lumotlar omboriga saqlanishi kerak bo'lgan kitob sxemasi
const kitobSxemasi = mongoose.Schema({
    nomi: String,
    narxi: Number,
    avtor: [String],
});

// Sxema asosida tuzilgan model, u bizga class qaytarib beradi
module.exports = mongoose.model("kitob", kitobSxemasi);