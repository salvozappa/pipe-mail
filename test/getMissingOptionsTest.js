const assert = require('assert');
const td = require('testdouble');
const getMissingOptions = require('../lib/getMissingOptions');

describe('getMissingOptions', () => {

    let options;

    it('Should return an empty array if all required options are present', () => {
        options = {
            from: 'foo@bar.com',
            to: 'bar@foo.com',
            host: 'smtp.foo.com',
            user: 'user',
            pass: 'password'
        };
        assert.deepEqual(getMissingOptions(options), [])
    });

    it('Should return a single mising required options', () => {
        options = {
            to: 'bar@foo.com',
            host: 'smtp.foo.com',
            user: 'user',
            pass: 'password'
        };
        assert.deepEqual(getMissingOptions(options), ['from']);
    });

    it('Should return all mising required options', () => {
        options = {};
        assert.deepEqual(getMissingOptions(options), ['from', 'to', 'host', 'user', 'pass']);
    });

    it('Should not consider undefined values', () => {
        options = {
            to: undefined
        };
        assert(getMissingOptions(options).indexOf('to') > -1);
    });
});
