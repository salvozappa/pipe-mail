module.exports = (message, options, transporter) => {
    return new Promise((resolve, reject) => {
        const transporterOptions = {
            from: options.from,
            to: options.to,
            subject: options.subject
        };
        if (options.html === true) {
            transporterOptions.html = message;
        } else {
            transporterOptions.text = message;
        }
        transporter.sendMail(transporterOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info.messageId);
            }
        });
    });
}
