const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
    userId: String,
    uniqueId: String,
    createdAt: Date,
    expiresIn: Date,
});

module.exports = mongoose.model("verification", verificationSchema);