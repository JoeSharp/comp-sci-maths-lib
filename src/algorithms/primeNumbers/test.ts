import { cloneDeep } from "lodash";

import sieveOfEratosthenes, {
  PrimeCallback,
  PrimeCallbackArgs,
} from "./sieveOfEratosthenes";
import { isDivisibleBy, getDigits, dividesBy3 } from "./divisibilityRules";
import { StringReporter } from "../common";
import { simpleLogger } from "../../common";
import { getPrimeFactors, getPrimeFactorTree } from "./primeFactors";

test("Divisible By (modulo)", () => {
  expect(isDivisibleBy(9, 3)).toBeTruthy();
  expect(isDivisibleBy(151, 4)).toBeFalsy();
  expect(isDivisibleBy(8, 5)).toBeFalsy();
  expect(isDivisibleBy(982, 9)).toBeFalsy();
});

test("getDigits", () => {
  expect(getDigits(5673)).toStrictEqual([5, 6, 7, 3]);
  expect(getDigits(985)).toStrictEqual([9, 8, 5]);
  expect(getDigits(1748201)).toStrictEqual([1, 7, 4, 8, 2, 0, 1]);
});

test("Divides by 3", () => {
  const reporter: StringReporter = (s) => simpleLogger.debug(s);

  dividesBy3(67, reporter);
  dividesBy3(94033, reporter);
  dividesBy3(374841, reporter);
});

test("Get Prime Factors", () => {
  expect(getPrimeFactors(36)).toStrictEqual([2, 2, 3, 3]);
  expect(getPrimeFactors(147)).toStrictEqual([3, 7, 7]);
  expect(getPrimeFactors(13)).toStrictEqual([13]);
  expect(getPrimeFactors(1067)).toStrictEqual([11, 97]);
});

test("Get Prime Factor Tree", () => {
  [1067, 3600, 45827].forEach((value) => {
    const tree = getPrimeFactorTree(value);
    simpleLogger.info(`Prime Factor Tree for ${value}:\n ${tree.toString()}`);
  });
});

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
