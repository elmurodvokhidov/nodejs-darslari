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
            type: Boolean,
            default: false,
        },
        favorities: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "kitob"
        },
        basket: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "kitob"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("auth", authSchema);