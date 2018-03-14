module.exports = (options, nodeMailer) => {
    return nodeMailer.createTransport({
        host: options.host,
        secure: true,
        auth: {
            user: options.user,
            pass: options.password
        }
    });
}