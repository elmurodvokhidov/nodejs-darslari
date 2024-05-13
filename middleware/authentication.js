function authentication(req, res, next) {
    console.log("Authentication checked...");
    next();
};

module.exports = authentication;