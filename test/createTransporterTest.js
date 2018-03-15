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


    it('Should not pass the port if it\'s undefined', () => {
        createTransporter({
            port: undefined
        }, nodeMailerMock);
        td.verify(nodeMailerMock.createTransport(
            td.matchers.argThat((options) => { return Object.keys(options).indexOf('port') === -1 }),
        ));
    })
});
