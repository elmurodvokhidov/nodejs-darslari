const mongoose = require('mongoose');

module.exports = function (app) {
    const port = process.env.PORT || 5100;

    mongoose.connect(process.env.CONN_STR)
        .then(() => {
            console.log("MongoDb ga ulanish hosil qilindi...");
            app.listen(port, () => console.log(`${port} ni eshitishni boshladim...`));
        })
        .catch((err) => console.log("MongoDb ga ulanishda XATOLIK: " + err));
};