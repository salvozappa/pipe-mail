module.exports = (options, nodeMailer) => {
    return nodeMailer.createTransport({
        host: options.host,
        secure: options.secure,
        auth: {
            user: options.user,
            pass: options.password
        }
    });
}