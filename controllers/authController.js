const passwordComplexity = require("joi-password-complexity");
const Auth = require('../model/authModel');
const bcrypt = require('bcrypt');

const signUpFunction = async (req, res) => {
    try {
        const { fullname, email, password, dob, role } = req.body;

        const { error } = await validatePasswordFunction(password);
        if (error) return res.status(400).send(error.details[0].message);

        const hashedPassword = await bcrypt.hash(password, 15);
        const newAuth = await Auth.create({
            fullname,
            email,
            password: hashedPassword,
            dob,
            role
        });

        res.status(201).json(newAuth);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
};

const signInFunction = async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundAuth = await Auth.findOne({ email });
        if (!foundAuth) return res.status(404).send("Foydalanuvchi topilmadi, iltimos ro'yhatdan o'ting!");

        const isPassword = await bcrypt.compare(password, foundAuth.password);
        if (!isPassword) return res.status(400).send("Parol xato, iltimos qayta urinib ko'ring!");

        res.status(200).json(foundAuth);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
};

// Validate Password funksiyasi
const validatePasswordFunction = (password) => {
    const schema = {
        min: 8,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
    };

    return passwordComplexity(schema).validate(password);
};

module.exports = {
    signUpFunction,
    signInFunction,
};