const assert = require('assert');
const td = require('testdouble');
const requireOptions = require('../lib/requireOptions');

describe('requireOptions', () => {

    let options;

    it('Should return an empty array if all required options are present', () => {
        options = {
            from: 'foo@bar.com',
            to: 'bar@foo.com',
            subject: 'Subject',
            host: 'smtp.foo.com',
            user: 'user',
            pass: 'password'
        };
        assert.deepEqual(requireOptions(options), [])
    });

    it('Should return a single mising required options', () => {
        options = {
            to: 'bar@foo.com',
            subject: 'Subject',
            host: 'smtp.foo.com',
            user: 'user',
            pass: 'password'
        };
        assert.deepEqual(requireOptions(options), ['from']);
    });

    it('Should return all mising required options', () => {
        options = {};
        assert.deepEqual(requireOptions(options), ['from', 'to', 'subject', 'host', 'user', 'pass']);
    });

    it('Should not consider undefined values', () => {
        options = {
            to: undefined
        };
        assert(requireOptions(options).indexOf('to') > -1);
    });
});
