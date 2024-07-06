const passwordComplexity = require("joi-password-complexity");
const Auth = require('../model/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUpFunction = async (req, res) => {
    try {
        const { fullname, email, password, role } = req.body;

        const existingAuth = await Auth.findOne({ email });
        if (existingAuth) return res.status(400).send("Ushbu elektron pochta avval foydalanilgan");

        const { error } = await validatePasswordFunction(password);
        if (error) return res.status(400).send(error.details[0].message);

        const hashedPassword = await bcrypt.hash(password, 15);
        const newAuth = await Auth.create({
            fullname,
            email,
            password: hashedPassword,
            role
        });

        const token = jwt.sign({ id: newAuth._id, role }, process.env.JWT_KEY, { expiresIn: "30d" });

        // ? res.status(201).header("x-token", token).json(newAuth);
        res.status(201).json({ data: newAuth, token });
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

        const token = jwt.sign({ id: foundAuth._id, role: foundAuth.role }, process.env.JWT_KEY, { expiresIn: "30d" });
        res.status(201).json({ data: foundAuth, token });
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
};

const getAuth = async (req, res) => {
    try {
        const foundAuth = await Auth.findById(req.authId)
            .populate({
                path: "basket.book",
                model: "kitob",
                populate: {
                    path: "avtor",
                    model: "auth"
                }
            });
        if (!foundAuth) return res.status(404).json("Foydalanuvchi topilmadi");

        res.status(200).json({ data: foundAuth });
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
};

const incAndDecFunction = async (req, res) => {
    try {
        const { userId, id } = req.params;
        const { type } = req.body;

        const existingAuth = await Auth.findById(userId);
        if (!existingAuth) return res.status(404).send("Foydalanuvchi topilmadi");

        const existingId = existingAuth.basket.find(item => item._id.toString() === id);
        if (!existingId) return res.status(404).send("Ma'lumot topilmadi");

        if (type === "inc") {
            existingAuth.basket.map(item => item._id.toString() === existingId._id.toString() ? item.count += 1 : item);
        }
        else if (type === "dec" && existingId.count > 0) {
            existingAuth.basket.map(item => item._id.toString() === existingId._id.toString() ? item.count -= 1 : item);
        }

        await existingAuth.save();
        await existingAuth.populate("basket.book");
        res.status(200).send({ data: existingAuth });
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
};

const deleteFromBasket = async (req, res) => {
    try {
        const { userId, bookId } = req.params;
        // TODO: userId yordamida aynan tegishli user ma'lumotlarini database dan izlab topish
        const existingAuth = await Auth.findById(userId);
        // TODO: Agar berilgan userId bo'yicha user topilmasa, xatolikni boshqarish
        if (!existingAuth) return res.status(404).send("Foydalanuvchi topilmadi");
        // TODO: Agar berilgan userId bo'yicha user topilsa, uning savatidan berilgan bookId bo'yicha tegishli kitobni izlab topish
        const existingBookId = existingAuth.basket.find(item => item.book.toString() === bookId);
        // TODO: Agar berilgan bookId bo'yicha user savatidan kitob topilmasa, xatolikni boshqarish
        if (!existingBookId) return res.status(404).send("Ma'lumot topilmadi");
        // TODO: Agar berilgan bookId bo'yicha user savatidan kitob topilsa, kitob ma'lumotlarini o'chirib yuborish
        existingAuth.basket = existingAuth.basket.filter(item => item.book.toString() !== existingBookId.book.toString());
        // TODO: Yangilangan foydalanuvchi ma'lumotlarini database ga saqlash
        await existingAuth.save();
        await existingAuth.populate("basket.book");
        // TODO: O'chirish muvaffaqiyatli bajarilsa chaqiruvchiga bildirish
        res.status(200).send({ data: existingAuth, message: "Muvaffaqiyatli o'chirildi" });
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
        requirementCount: 2,
    };

    return passwordComplexity(schema).validate(password);
};

module.exports = {
    signUpFunction,
    signInFunction,
    getAuth,
    incAndDecFunction,
    deleteFromBasket,
};