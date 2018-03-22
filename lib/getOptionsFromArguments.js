module.exports = (commanderArguments) => {
    const options = {};
    if (commanderArguments.length > 1) {
        options.from = commanderArguments[0];
        options.to = commanderArguments[1];
    }
    else if (commanderArguments.length === 1) {
        options.to = commanderArguments[0];
    }
    return options;
};
