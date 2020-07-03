const requiredKeys = [
    'from',
    'to',
    'host'
];

module.exports = (options) => {
    const providedKeys = Object.keys(options);
    return requiredKeys.filter(key => (typeof options[key] === 'undefined') || (!providedKeys.includes(key)));
};
