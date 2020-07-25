import { cloneDeep } from "lodash";

import sieveOfEratosthenes, {
  PrimeCallback,
  PrimeCallbackArgs,
} from "./sieveOfEratosthenes";

test("Sieve of Eratosthenes", () => {
  const callbacks: PrimeCallbackArgs[] = [];
  const recordingCallback: PrimeCallback = (args: PrimeCallbackArgs) =>
    callbacks.push(cloneDeep(args)); // must take a deep copy

  const primes = sieveOfEratosthenes(20, recordingCallback);

  expect(callbacks).toStrictEqual([
    {
      p: 2,
      tickedOff: [4, 6, 8, 10, 12, 14, 16, 18, 20],
    },
    {
      p: 3,
      tickedOff: [9, 12, 15, 18],
    },
    {
      p: 5,
      tickedOff: [],
    },
    {
      p: 7,
      tickedOff: [],
    },
    {
      p: 11,
      tickedOff: [],
    },
    {
      p: 13,
      tickedOff: [],
    },
    {
      p: 17,
      tickedOff: [],
    },
    {
      p: 19,
      tickedOff: [],
    },
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
