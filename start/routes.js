module.exports = function (app) {
    app.get('/', (_, res) => res.send("Hello World!"));
    app.use('/api/books', require('../routes/booksRoute'));
    app.use('/api/category', require('../routes/categoryRoute'));
    app.use('/api/auth', require('../routes/authRoute'));
    app.use('/api/upload-image', require('../routes/imageRoute'));
};