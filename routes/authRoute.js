const express = require("express");
const { createAuthFunction } = require("../controllers/authController");
const router = express.Router();

router.post("/", createAuthFunction);

module.exports = router;