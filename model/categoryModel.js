const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
    {
        nomi: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 15,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("category", categorySchema);