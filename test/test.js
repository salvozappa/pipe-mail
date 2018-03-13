const assert = require('assert');
const td = require('testdouble');
const readStandardInput = require('../lib/readStandardInput');
const EventEmitter = require('events');

describe('readStandardInput', () => {
    it('Should set the encoding to utf8', () => {
        const stdinMock = new EventEmitter();
        stdinMock.setEncoding = td.function('set encoding');
        readStandardInput(stdinMock);
        td.verify(stdinMock.setEncoding('utf8'));
    });

    it('Should read the standard input', function () {
        const stdinMock = new EventEmitter();
        stdinMock.setEncoding = td.function('set encoding');
        stdinMock.read = td.function('read');
        setTimeout(() => {
            stdinMock.emit('readable');
            stdinMock.emit('end');
        }, 5);
        return readStandardInput(stdinMock).then(() => {
            td.verify(stdinMock.read());
        });
    });
});
