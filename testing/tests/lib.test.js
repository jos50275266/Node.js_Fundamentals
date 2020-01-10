
// Testing For Fun!
test('Our first test', () => {

});

// Testing numbers! - Check Out Different Matchers in Jest Docs!
const lib = require('../lib')

test('absolute - show return a positive number if input is positive ', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1); // toBeCloseTo
})

test('absolute - show return a positive number if input is negative ', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
})

test('absolute - show return 0 if input is 0 ', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
})

// Grouping Tests

