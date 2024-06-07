const Auth = require('../model/authModel');

const createAuthFunction = async (req, res) => {
    try {
        const newAuth = await Auth.create(req.body);
        res.status(201).json(newAuth);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
};

module.exports = {
    createAuthFunction,
};