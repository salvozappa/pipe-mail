module.exports = (options, nodeMailer) => {
    const nodemailerOptions.host = options.host;
    if (options.user) {
        nodemailerOptions.auth.user = options.user;
    }
    if (options.pass) {
        nodemailerOptions.auth.pass = options.password;
    }
    if (options.port) {
        nodemailerOptions.port = options.port;
    }
    if (typeof options.ssl === 'boolean') {
        nodemailerOptions.secure = options.ssl;
    }
    return nodeMailer.createTransport(nodemailerOptions);
};
