const assert = require('assert');
const td = require('testdouble');
const createTransporter = require('../lib/createTransporter');

describe('createTransporter', () => {
    const nodeMailerMock = {
        createTransport: td.function()
    }

    it('Should properly set the options', () => {
        createTransporter({
            host: 'host',
            user: 'user',
            password: 'password',
        }, nodeMailerMock);
        td.verify(nodeMailerMock.createTransport({
            host: 'host',
            secure: true,
            auth: {
                user: 'user',
                pass: 'password'
            }
        }))
    });

    it('Should not pass an invalid option to nodemailer', () => {
        createTransporter({
            host: 'host',
            user: 'user',
            password: 'password',
            foo: 'bar' // this invalid option should be scrapped
        }, nodeMailerMock);
        td.verify(nodeMailerMock.createTransport({
            host: 'host',
            secure: true,
            auth: {
                user: 'user',
                pass: 'password'
            }
        }))
    });
});
