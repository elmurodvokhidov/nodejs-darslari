const express = require("express");
const upload = require("../config/multer");
const router = express.Router();

router.post("/", upload.single('image'), (req, res) => {
    res.status(200).json({ imgUrl: `http://localhost:5100/${req.file.filename}` });
});

module.exports = router;