module.exports = (options, nodeMailer) => {
    const nodemailerOptions = {
        host: options.host,
        auth: {
            user: options.user,
            pass: options.password
        }
    };
    if (options.port) {
        nodemailerOptions.port = options.port;
    }
    if (typeof options.ssl === 'boolean') {
        nodemailerOptions.secure = options.ssl;
    }
    return nodeMailer.createTransport(nodemailerOptions);
};
