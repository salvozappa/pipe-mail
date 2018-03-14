module.exports = (message, mailOptions, transporter) => {
    return new Promise((resolve, reject) => {
        mailOptions.text = message;
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            }
            resolve(info.messageId);
        });
    });
}