const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
    userId: String,
    uniqueId: String,
    expiresIn: Date,
});

module.exports = mongoose.model("verification", verificationSchema);