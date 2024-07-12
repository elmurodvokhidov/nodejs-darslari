module.exports = function (email, link) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Rasamahani tasdiqlang',
        html: `<p>
            Iltimos, rasamahani tasdiqlash uchun quyidagi havoladan foydalaning: <br />
            <a href=${link}>${link}</a> <br />
            Havolaning amal qilish muddati <b>5 soat</b>
        </p>`
    };

    return mailOptions;
};