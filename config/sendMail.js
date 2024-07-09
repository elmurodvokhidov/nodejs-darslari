const checkTranfporterWork = require("./checkTranfporterWork");
const mailOptions = require("./mailOptions");
const transporter = require("./transporter");

module.exports = function ({ _id, email }) {
    checkTranfporterWork();

    transporter.sendMail(mailOptions(email), function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};