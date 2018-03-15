module.exports = (options, nodeMailer) => {
    const nodemailerOptions = {
        host: options.host,
        secure: true,
        auth: {
            user: options.user,
            pass: options.password
        }
    };
    if (options.port) {
        nodemailerOptions.port = options.port;
    }
    if (options.port) {
        nodemailerOptions.port = options.port;
    }
    return nodeMailer.createTransport(nodemailerOptions);
}
