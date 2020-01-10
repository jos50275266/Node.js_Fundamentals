
// Testing For Fun!
test('Our first test', () => {

});

// Testing numbers! - Check Out Different Matchers in Jest Docs!
const lib = require('../improved_lib')

test('absolute - show return a positive number if input is positive ', () => {
    const result = lib.before_test_absolute(1);
    expect(result).toBe(1); // toBeCloseTo
})

test('absolute - show return a positive number if input is negative ', () => {
    const result = lib.before_test_absolute(-1);
    expect(result).toBe(1);
})

test('absolute - show return 0 if input is 0 ', () => {
    const result = lib.before_test_absolute(0);
    expect(result).toBe(0);
})

// Grouping Tests - Tests are first-class citizens in your source code 결
// 결과를 보면 absolute 아래 grouping test가 먼저 실행되고 위의 separate test가 실행된다.
// 그래서 Grouping Tests 를 first-class citizens 이라 칭한다.
// the "test" method will be replaced by the method name "it"
// Refactoring with Confidence

describe('absolute', () => {
    it('show return a positive number if input is positive ', () => {
        const result = lib.after_test_absolute(1);
        expect(result).toBe(1); // toBeCloseTo
    })

    it('show return a positive number if input is negative ', () => {
        const result = lib.after_test_absolute(-1);
        expect(result).toBe(1);
    })

    it('show return 0 if input is 0 ', () => {
        const result = lib.after_test_absolute(0);
        expect(result).toBe(0);
    })

    it('show return a positive number if input is positive ', () => {
        const result = lib.after_test_condition_operator_absolute(1);
        expect(result).toBe(1); // toBeCloseTo
    })

    it('show return a positive number if input is negative ', () => {
        const result = lib.after_test_condition_operator_absolute(-1);
        expect(result).toBe(1);
    })

    it('show return 0 if input is 0 ', () => {
        const result = lib.after_test_condition_operator_absolute(0);
        expect(result).toBe(0);
    })
});

// Testing Strings
describe('greet', () => {
    // 이 Test의 문제는 너무 specific 하기 때문에 아주 쉽게 test fail을 만들 수 있다.
    // Test should neither too specific nor too general
    it('should return the greeting message', () => {
        const result = lib.before_test_greet('Mosh');
        expect(result).toBe('Welcome Mosh')
    })

    // Too General with Regular Expression
    it('should return the greeting message', () => {
        const result = lib.before_test_greet('Mosh');
        expect(result).toMatch(/Mosh/);
        expect(result).toContain('Mosh');
    })
});

// Testing Arrays
describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        // Too General - return 1 will also pass the test
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // Too Specific - 내일 알고리즘을 변경해서 값이 변경되면 Test Fail
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        // Proper Way to test this function (Not Idea) - Just 'USD' 
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');

        // Ideal Way to test this function, order ins't matter
        expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']))
    })
});

// Testing Objects
describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct(1);
        // Two Objects are identical but located in different places in memory
        // expect(result).toBe({ id: 1, price: 10 });
        // instead of toBe
        expect(result).toEqual({ id: 1, price: 10 });
        expect(result).toMatchObject({ id: 1, price: 10 });
        // toEqual: compare property value, 
        // toMatchObject: just property that we defined in toMatchObject object
        expect(result).toHaveProperty('id', 1);
        // Don't care other property, type-sensitive
    })
})

// Testing Exceptions 
// Count the number of needed test
describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        // Single Assertion Principle (if you want) - but in this case 
        // it is not necessary to write multiple different 'it' here
        // All the below values is allowed to use as username
        // Null
        // undefined
        // NaN
        // ''
        // 0
        // false
        const args = [null, undefined, NaN, '', 0, false]
        args.forEach(a => {
            expect(() => { lib.registerUser(a); }).toThrow();
        })
    })

    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('mosh')
        expect(result).toMatchObject({ username: 'mosh' });
        // current time은 다르기 때문에 포함하지않는다, 대신에 아래와 같은 logic을 이용
        expect(result.id).toBeGreaterThan(0);
    })

})

// Continuously Running Tests
// "test": "jest --watchAll"