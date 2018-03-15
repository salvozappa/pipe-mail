const assert = require('assert');
const td = require('testdouble');
const getInvalidOptions = require('../lib/getInvalidOptions');

describe('getInvalidOptions', () => {

    let options;

    it('Should accept valid e-mails', () => {
        options = {
            from: 'foo@bar.com',
            to: 'bar@foo.com',
        };
        assert.deepEqual(getInvalidOptions(options), [])
    });

    it('Should not accept invalid e-mails', () => {
        options = {
            from: 'invalidemail',
            to: 'invalidemail',
        };
        assert.deepEqual(getInvalidOptions(options), ['from', 'to'])
    });

    it('Should accept a valid host', () => {
        options = {
            host: 'smtp.foo.com',
        };
        assert.deepEqual(getInvalidOptions(options), []);
    });

    it('Should not accept an invalid host', () => {
        options = {
            host: 'invalidhost',
        };
        assert.deepEqual(getInvalidOptions(options), ['host']);
    });

    it('Should accept non-empty credentials', () => {
        options = {
            user: 'user',
            pass: 'pass'
        };
        assert.deepEqual(getInvalidOptions(options), []);
    });

    it('Should accept a valid port number', () => {
        options = {
            port: '2020'
        };
        assert.deepEqual(getInvalidOptions(options), []);
    });

    it('Should not accept a non-numeric port number', () => {
        options = {
            port: 'abc'
        };
        assert.deepEqual(getInvalidOptions(options), ['port']);
    });

    it('Should not accept empty credentials', () => {
        options = {
            user: '',
            pass: ''
        };
        assert.deepEqual(getInvalidOptions(options), ['user', 'pass']);
    });
});
