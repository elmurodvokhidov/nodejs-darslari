const mongoose = require("mongoose");

const authSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        dob: Date
    },
    { timestamps: true }
);

module.exports = mongoose.model("auth", authSchema);