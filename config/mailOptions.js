module.exports = function (email) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    return mailOptions;
};