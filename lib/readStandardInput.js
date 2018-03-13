const readStandardInput = (standardInput) => {
    return new Promise((resolve, reject) => {
        let textInput = '';
        standardInput.setEncoding('utf8');
        standardInput.on('readable', () => {
            const chunk = standardInput.read();
            if (chunk !== null) {
                textInput += chunk;
            }
        });
        standardInput.on('end', () => {
            resolve(textInput);
        });
    });
}

module.exports = readStandardInput;
