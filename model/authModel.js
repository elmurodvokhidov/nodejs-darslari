const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "user",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("auth", authSchema);