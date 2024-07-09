const mongoose = require("mongoose");

// Ma'lumotlar omboriga saqlanishi kerak bo'lgan kitob sxemasi
const kitobSxemasi = mongoose.Schema(
    {
        nomi: String,
        narxi: Number,
        cat: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
        img: String,
        description: String,
        avtor: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
        comments: [{
            text: String,
            rating: Number,
            avtor: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
        }]
    },
    { timestamps: true }
);

// Sxema asosida tuzilgan model, u bizga class qaytarib beradi
module.exports = mongoose.model("kitob", kitobSxemasi);