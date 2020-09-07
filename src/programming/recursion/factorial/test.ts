import { factorial as factorialRecursive } from './factorialRecursive'
import { factorial as factorialLoop } from './factorialLoop'
import { TestCase, NamedFactorialFunction } from './types';

// We want to test both functions using the same code, so put into a collection
const FACTORIAL_FUNCTIONS: NamedFactorialFunction[] = [
    { name: 'Recursive', factorial: factorialRecursive },
    { name: 'Loop', factorial: factorialLoop }
]

// Pre-calculated factorial results that we can try each function on
const TEST_CASES: TestCase[] = [{
    input: 5,
    expectedOutput: 120
}, {
    input: 8,
    expectedOutput: 40320
}, {
    input: 11,
    expectedOutput: 39916800
}]

FACTORIAL_FUNCTIONS.forEach(({ name, factorial }) => {
    TEST_CASES.forEach(({ input, expectedOutput }) => {
        test(`Factorial - ${name} of ${input}`, () => {

            let output = factorial(input);
            expect(output).toBe(expectedOutput);
        });
    });
})

// These are basically the same tests, but without using the gnarly named test collection
// Note that this test code is perhaps clearer, but more repetitive
test("Factorial - Recursive vs Loop", () => {
    // try a couple of cases with the recursive function
    let factorial5_recurse = factorialRecursive(5);
    expect(factorial5_recurse).toBe(120);

    // Note that I am having to repeat the structure here...
    let factorial8_recurse = factorialRecursive(8);
    expect(factorial8_recurse).toBe(40320);

    // Then same again with loop based
    let factorial5_loop = factorialLoop(5);
    expect(factorial5_loop).toBe(120);

    let factorial8_loop = factorialLoop(8);
    expect(factorial8_loop).toBe(40320)
});