const assert = require('assert');
const td = require('testdouble');
const getInvalidOptions = require('../lib/getInvalidOptions');

describe('getInvalidOptions', () => {

    let options;

    it('Should return an empty array if all options are valid', () => {
        options = {
            from: 'foo@bar.com',
            to: 'bar@foo.com',
            subject: 'Subject',
            host: 'smtp.foo.com',
            user: 'user',
            pass: 'password'
        };
        assert.deepEqual(getInvalidOptions(options), [])
    });

    it('Should return a single invalid options', () => {
        options = {
            from: 'invalidemail',
            to: 'bar@foo.com',
            subject: 'Subject',
            host: 'smtp.foo.com',
            user: 'user',
            pass: 'password'
        };
        assert.deepEqual(getInvalidOptions(options), ['from']);
    });

    it('Should return all invalid options', () => {
        options = {
            from: 'invalidemail',
            to: 'invalidemail',
            subject: '',
            host: 'invalidhost',
            user: '',
            pass: ''
        };
        assert.deepEqual(getInvalidOptions(options), ['from', 'to', 'subject', 'host', 'user', 'pass']);
    });
});
