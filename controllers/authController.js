const passwordComplexity = require("joi-password-complexity");
const Auth = require('../model/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require("../config/sendMail");
const Verification = require("../model/verificationModel");
const sendMailForPass = require("../config/sendMailForPass");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
            role,
            verified: false,
        });

        // const token = jwt.sign({ id: newAuth._id, role }, process.env.JWT_KEY, { expiresIn: "30d" });

        // todo: Ro'yhatdan o'tgan foydalanuvchi uchun email xabar jo'natish funksiyasi
        sendMail(newAuth);

        // todo: Ushbu holatda ya'ni email muvaffaqiyatli jo'natilganidan so'ng vaziyatga qarab foydalanuvchi ma'lumotlarini chaqiruvchiga qaytarib berish eng to'g'ri yo'l bo'ldi
        // ? res.status(201).header("x-token", token).json(newAuth);
        res.status(200).json({ message: "Xabar muvaffaqiyatli jo'natildi" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
};

const signInFunction = async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundAuth = await Auth.findOne({ email })
        await foundAuth.populate([
            {
                path: "basket.book",
                model: "kitob",
                populate: [
                    { path: "avtor", model: "auth" },
                    { path: "cat", model: "category" }
                ]
            },
            { path: "wishlist" }
        ]);
        if (!foundAuth) return res.status(404).send("Foydalanuvchi topilmadi, iltimos ro'yhatdan o'ting!");

        // todo: Agar foydalanuvchi ma'lumotlari topilsayu lekin uning verified xossasi false bo'lsachi?
        if (!foundAuth.verified) return res.status(400).send("Foydalanuvchi verifikatsiyadan o'tmagan!");

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
        await foundAuth.populate([
            {
                path: "basket.book",
                model: "kitob",
                populate: [
                    { path: "avtor", model: "auth" },
                    { path: "cat", model: "category" }
                ]
            }, {
                path: "orders.products",
                model: "kitob",
                populate: [
                    { path: "avtor", model: "auth" },
                    { path: "cat", model: "category" }
                ]
            },
            { path: "wishlist" }
        ]);
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
        await existingAuth.populate([
            {
                path: "basket.book",
                model: "kitob",
                populate: [
                    { path: "avtor", model: "auth" },
                    { path: "cat", model: "category" }
                ]
            },
            { path: "wishlist" }
        ]);
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
        await existingAuth.populate([
            {
                path: "basket.book",
                model: "kitob",
                populate: [
                    { path: "avtor", model: "auth" },
                    { path: "cat", model: "category" }
                ]
            },
            { path: "wishlist" }
        ]);
        // TODO: O'chirish muvaffaqiyatli bajarilsa chaqiruvchiga bildirish
        res.status(200).send({ data: existingAuth, message: "Muvaffaqiyatli o'chirildi" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
};

// todo: Yangi controller funksiya qo'shish lozim, foydalanuvchini verifikatsiya qilish uchun
const verificateUser = async (req, res) => {
    try {
        const { userId, uniqueId } = req.params;
        // todo: Eng avval verification modelidan kelgan so'rov bo'yicha ma'lumot bor yoki yo'qligini tekshirib olish zarur
        const existingVerification = await Verification.findOne({ userId });
        // todo: Agar yo'q bo'lsa mos ravishda html sahifani qaytarish
        if (!existingVerification) return res.render('error', { message: "Verifikatsiyadan o'tishda xatolik yoki allaqachon verifikatsiya qilib bo'lindi" });
        // todo: Agar bor bo'lsa verifikatsiyani muddatini tekshirish
        if (existingVerification.expiresIn < Date.now()) {
            // todo: Agar muddati o'tgan bo'lsa mos ravishda html sahifani qaytarish va verification model ma'lumoti hamda foydalanuvchi ma'lumotlarini database dan o'chirib yuborish
            await Verification.deleteOne({ userId });
            await Auth.findByIdAndDelete(userId);
            res.render('error', { message: "Afsuski amal qilish muddati tugadi, oldinroq kirish kerak edi. Yoki boshqatdan ro'yhatdan o'ting!" });
        }
        else {
            // todo: Aks holda uniqueId yordamida ma'lumotni asl ekanligi tekshiriladi, agar xatolik bo'lsa mos ravishda html sahifa qaytariladi
            const isValid = await bcrypt.compare(uniqueId, existingVerification.uniqueId);
            if (!isValid) return res.render('error', { message: "Verifikatsiya ma'lumotlari yaroqsiz, iltimos qayta tekshirib ko'ring!" });
            // todo: Agar shu yergacham yetib kelsa u holda foydalanuvchi ma'lumotlari o'zgartiriladi qaysiki verified: false => verified: true
            await Auth.findByIdAndUpdate(userId, { verified: true });
            // todo: So'ng verification model ma'lumotlari o'chirilib yuboriladi
            await Verification.deleteMany({ userId });
            res.render('verified', { message: "Verifikatsiya muvaffaqiyatli tugallandi, sahifani yopib, hisobingizga kiring" });
        }
    } catch (error) {
        console.log(error.message);
        res.render('error', { message: error.message });
    }
};

const findUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const foundAuth = await Auth.findOne({ email });
        if (!foundAuth) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        sendMailForPass(foundAuth);
        res.status(200).json({ message: `${email} ga xabar muvaffaqiyatli jo'natildi` });
    } catch (error) {
        console.log(error.message);
        res.render('error', { message: error.message });
    }
};

const updatePassword = async (req, res) => {
    try {
        const { userId, uniqueId } = req.params;
        const { newPassword, confirmPassword } = req.body;
        const existingVerification = await Verification.findOne({ userId });
        if (!existingVerification) return res.status(400).json({ message: "Parolni yangilashda muammo yoki link yaroqsiz" });
        if (existingVerification.expiresIn < Date.now()) {
            await Verification.deleteOne({ userId });
            res.status(400).json({ message: "Afsuski amal qilish muddati tugadi, oldinroq kirish kerak edi. Yoki boshqatdan so'rov jo'nating!" });
        }
        else {
            const isValid = await bcrypt.compare(uniqueId, existingVerification.uniqueId);
            if (!isValid) return res.status(400).json({ message: "Link yaroqsiz, iltimos qayta tekshirib ko'ring!" });
            await Verification.deleteMany({ userId });
            const foundAuth = await Auth.findById(userId);
            if (!foundAuth) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
            const isMatch = newPassword === confirmPassword;
            if (!isMatch) return res.status(400).json({ message: "Parollar mos emas" });
            const hashedPassword = await bcrypt.hash(newPassword, 15);
            foundAuth.password = hashedPassword;
            await foundAuth.save();
            res.status(200).json({ message: "Parol muvaffaqiyatli yangilandi" });
        }
    } catch (error) {
        console.log(error.message);
        res.render('error', { message: error.message });
    }
};

const payment = async (req, res) => {
    try {
        const { totalAmount, currency, source, products } = req.body;
        const charges = await stripe.charges.create({
            amount: totalAmount * 100,
            currency,
            source
        });
        const foundAuth = await Auth.findById(req.authId);
        if (!foundAuth) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        foundAuth.orders.push({
            products,
            total: totalAmount,
            address: charges.billing_details.address,
            status: "pending"
        });
        foundAuth.basket = [];
        await foundAuth.save();
        await foundAuth.populate([
            {
                path: "basket.book",
                model: "kitob",
                populate: [
                    { path: "avtor", model: "auth" },
                    { path: "cat", model: "category" }
                ]
            }, {
                path: "orders.products",
                model: "kitob",
                populate: [
                    { path: "avtor", model: "auth" },
                    { path: "cat", model: "category" }
                ]
            },
            { path: "wishlist" }
        ]);
        res.status(200).json({ data: foundAuth, message: "Buyurtmangiz qabul qilindi" });
    } catch (error) {
        console.log(error.message);
        res.render('error', { message: error.message });
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
    verificateUser,
    findUserByEmail,
    updatePassword,
    payment
};