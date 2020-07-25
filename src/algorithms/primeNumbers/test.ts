import { cloneDeep } from "lodash";

import sieveOfEratosthenes, {
  MarkedNumber,
  PrimeCallback,
  PrimeCallbackArgs,
} from "./sieveOfEratosthenes";

test("Sieve of Eratosthenes", () => {
  const callbacks: MarkedNumber[] = [];
  const recordingCallback: PrimeCallback = ({
    markedNumbers,
    index,
  }: PrimeCallbackArgs) => callbacks.push(cloneDeep(markedNumbers[index])); // must take a deep copy

  const primes = sieveOfEratosthenes(20, recordingCallback);

  expect(callbacks).toStrictEqual([
    { value: 4, divisibleBy: [2] },
    { value: 6, divisibleBy: [2] },
    { value: 8, divisibleBy: [2] },
    { value: 10, divisibleBy: [2] },
    { value: 12, divisibleBy: [2] },
    { value: 14, divisibleBy: [2] },
    { value: 16, divisibleBy: [2] },
    { value: 18, divisibleBy: [2] },
    { value: 20, divisibleBy: [2] },
    { value: 9, divisibleBy: [3] },
    { value: 12, divisibleBy: [2, 3] },
    { value: 15, divisibleBy: [3] },
    { value: 18, divisibleBy: [2, 3] },
  ]);

  expect(primes).toStrictEqual([2, 3, 5, 7, 11, 13, 17, 19]);

  const primesTo121 = sieveOfEratosthenes(121, recordingCallback);
  expect(primesTo121).toStrictEqual([
    2,
    3,
    5,
    7,
    11,
    13,
    17,
    19,
    23,
    29,
    31,
    37,
    41,
    43,
    47,
    53,
    59,
    61,
    67,
    71,
    73,
    79,
    83,
    89,
    97,
    101,
    103,
    107,
    109,
    113,
  ]);
});
