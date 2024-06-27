const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = new multer({ storage });

module.exports = upload;