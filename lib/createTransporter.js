module.exports = (options, nodeMailer) => {
    const nodemailerOptions = {
        host: options.host,
        auth: {
        ... (options.user) ? {user: options.user} : null,
        ... (options.password) ? {pass: options.password} : null,
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
