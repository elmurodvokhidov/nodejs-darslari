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
        wishlist: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "kitob"
        },
        basket: [
            {
                book: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "kitob",
                },
                count: {
                    type: Number,
                    default: 1
                }
            }
        ],
        orders: [
            {
                products: [{ type: mongoose.Schema.Types.ObjectId, ref: "kitob" }],
                total: Number,
                address: Object,
                status: String,
                createdAt: { type: Date, default: Date.now() }
            }
        ],
        verified: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("auth", authSchema);