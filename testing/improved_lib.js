// Refactoring with Confidence

module.exports.before_test_absolute = function (number) {
    if (number > 0) return number;
    if (number < 0) return -number;
    return 0
}

module.exports.after_test_absolute = function (number) {
    if (number >= 0) return number;
    return -number;
}

module.exports.after_test_condition_operator_absolute = function (number) {
    return (number >= 0) ? number : -number;
}

module.exports.before_test_greet = function (name) {
    return 'Welcome ' + name;
}

module.exports.getCurrencies = function () {
    return ['USD', 'AUD', 'EUR'];
}

module.exports.getProduct = function (productId) {
    return { id: productId, price: 10 }
}

module.exports.registerUser = function (username) {
    if (!username) throw new Error('Username is required.');

    return { id: new Date().getTime(), username: username }
}