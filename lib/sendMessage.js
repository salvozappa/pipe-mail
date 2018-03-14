module.exports = (message, options, transporter) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: options.from,
            to: options.to,
            subject: options.subject,
            text: message
        }, (error, info) => {
            if (error) {
                reject(error);
            }
            resolve(info.messageId);
        });
    });
}