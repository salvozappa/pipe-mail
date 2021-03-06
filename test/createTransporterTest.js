const assert = require('assert');
const td = require('testdouble');
const createTransporter = require('../lib/createTransporter');

describe('createTransporter', () => {
    const nodeMailerMock = {
        createTransport: td.function()
    }

    it('Should pass the host to the transporter', () => {
        createTransporter({host: 'host'}, nodeMailerMock);
        td.verify(nodeMailerMock.createTransport(
            td.matchers.contains({ host: 'host'})
        ));
    });

    it('Should pass the port to the transporter', () => {
        createTransporter({ port: '10' }, nodeMailerMock);
        td.verify(nodeMailerMock.createTransport(
            td.matchers.contains({ port: '10' })
        ));
    });

    it('Should not pass the port to the transporter if it\'s undefined', () => {
        createTransporter({
            port: undefined
        }, nodeMailerMock);
        td.verify(nodeMailerMock.createTransport(
            td.matchers.argThat((options) => { return !Object.keys(options).includes('port')}),
        ));
    })

    it('Should pass "secure" to the transporter if "ssl" option is set', () => {
        createTransporter({ ssl: true }, nodeMailerMock);
        td.verify(nodeMailerMock.createTransport(
            td.matchers.contains({ secure: true })
        ));
    });

    it('Should disable "secure" in the transporter if "ssl" option is set to false', () => {
        createTransporter({ ssl: false }, nodeMailerMock);
        td.verify(nodeMailerMock.createTransport(
            td.matchers.contains({ secure: false })
        ));
    });

    it('Should not pass "secure" to the transporter if "ssl" option is not set', () => {
        createTransporter({}, nodeMailerMock);
        td.verify(nodeMailerMock.createTransport(
            td.matchers.argThat((options) => { return !Object.keys(options).includes('secure')}),
        ));
    });

    it('Should properly format the authentication options', () => {
        createTransporter({
            user: 'user',
            password: 'password',
        }, nodeMailerMock);
        td.verify(nodeMailerMock.createTransport(
            td.matchers.contains({
                auth: {
                    user: 'user',
                    pass: 'password'
                }
            })
        ));
    });

    it('Should not pass an invalid option to nodemailer', () => {
        createTransporter({
            foo: 'bar'
        }, nodeMailerMock);
        td.verify(nodeMailerMock.createTransport(
            td.matchers.argThat((options) => { return typeof options.foo === 'undefined' }),
        ));
    });
});
