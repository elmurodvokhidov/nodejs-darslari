module.exports = function (email, mailTitle, mailText) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: mailTitle,
        html: mailText
    };

    return mailOptions;
};