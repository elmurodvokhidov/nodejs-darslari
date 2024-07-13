const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

module.exports = function (app) {
    // ! Middleware
    app.use(express.json());

    // ! Built in middleware
    app.use(express.static('public'));
    app.use(express.static('uploads'));

    // ! Third party middleware
    app.use(helmet());
    if (app.get('env') === 'development') {
        app.use(cors());
    };

    // ! View engine
    app.set('view engine', 'ejs');
};