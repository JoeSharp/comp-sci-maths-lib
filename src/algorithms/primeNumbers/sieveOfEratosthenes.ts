import { Optional } from "../../types";
import { EMPTY_OBSERVER } from "../../common";

export interface MarkedNumber {
  value: number;
  divisibleBy: number[];
}

export type PrimeCallback = (markedNumber: MarkedNumber) => void;

/**
 * Runs the sieve of eratosthenes algorithm up to the given limit.
 *
 * https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
 *
 * @param limit The limit to work up to.
 * @returns The list of prime numbers between 1 and the limit.
 */
function sieveOfEratosthenes(
  limit: number,
  callback: PrimeCallback = EMPTY_OBSERVER
): number[] {
  const numbers: MarkedNumber[] = [];

  // 1. Create a list of consecutive integers from 2 through n: (2, 3, 4, ..., n).
  for (let value = 2; value <= limit; value++) {
    numbers.push({ value, divisibleBy: [] });
  }

  // 2. Initially, let p equal 2, the smallest prime number.
  let p: number = 2;
  let pMultiple: number = 2 * p;

  while (true) {
    // 3 . Enumerate the multiples of p by counting in increments of p from 2p to n, and mark them in the list (these will be 2p, 3p, 4p, ...; the p itself should not be marked).
    while (pMultiple <= limit) {
      const indexOfPMultiple = pMultiple - 2; // adjust to get the array position
      numbers[indexOfPMultiple].divisibleBy.push(p);
      callback(numbers[indexOfPMultiple]);

      pMultiple += p;
    }

    // 4. Find the smallest number in the list greater than p that is not marked. If there was no such number, stop.
    // Otherwise, let p now equal this new number (which is the next prime), and repeat from step 3.
    const nextP = numbers.find(
      ({ value, divisibleBy }) => value > p && divisibleBy.length === 0
    );

    if (!!nextP) {
      p = nextP.value;

      // As a refinement, it is sufficient to mark the numbers in step 3 starting from p2,
      // as all the smaller multiples of p will have already been marked at that point.
      pMultiple = p * p;
    } else {
      break;
    }
  }

  // 5. When the algorithm terminates, the numbers remaining not marked in the list are all the primes below n.
  return numbers
    .filter(({ divisibleBy }) => divisibleBy.length === 0)
    .map(({ value }) => value);
}

export default sieveOfEratosthenes;
