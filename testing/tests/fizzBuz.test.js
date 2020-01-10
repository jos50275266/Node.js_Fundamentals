const exercise = require('../exercise1');

describe('fizzBuzz', () => {
    it('show if input type is not a number', () => {
        const func = () => { };
        const everyTypesExceptNumber = [func, "string", {}, false, true, Symbol(2), null, undefined]
        everyTypesExceptNumber.forEach(type => {
            expect(() => { exercise.fizzBuzz(type) }).toThrow()
        })
    })

    it('show if input number commom factor of 15', () => {
        const result = exercise.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    })

    it('show if input number is multiple of 3 or 5', () => {
        const multipleOfThree = exercise.fizzBuzz(3);
        const multipleOfFive = exercise.fizzBuzz(5);
        expect(multipleOfThree).toBe('Fizz');
        expect(multipleOfFive).toBe('Buzz');
    })

    it('show if input number is not multiple of 3 or 5 and not common factor of 15', () => {
        const result = exercise.fizzBuzz(16);
        expect(result).toBe(16);
    })
})

