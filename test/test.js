const assert = require('assert');
const td = require('testdouble');
const readStandardInput = require('../lib/readStandardInput');
const EventEmitter = require('events');

class StandardInputMock extends EventEmitter {
    constructor() {
        super();
        this.setEncoding = td.function('fake set encoding function');
        this.read = () => { return 'foo' };
    }
}

describe('readStandardInput', () => {
    const stdinMock = new StandardInputMock();

    it('Should set the encoding to utf8', () => {
        readStandardInput(stdinMock);
        td.verify(stdinMock.setEncoding('utf8'));
    });

    it('Should read the standard input', () => {
        setTimeout(() => {
            stdinMock.emit('readable');
            stdinMock.emit('end');
        }, 5);
        return readStandardInput(stdinMock).then(() => {
            td.verify(stdinMock.read());
        });
    });

    it('Should concatenate multiple chunks', () => {
        setTimeout(() => {
            stdinMock.emit('readable');
            stdinMock.emit('readable');
            stdinMock.emit('end');
        }, 5);
        return readStandardInput(stdinMock).then((result) => {
            assert.equal(result, 'foofoo');
        });
    });
});
