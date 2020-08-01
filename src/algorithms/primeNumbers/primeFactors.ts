import sieveOfEratosthenes from "./sieveOfEratosthenes";
import { isDivisibleBy } from "./divisibilityRules";

export function getPrimeFactors(value: number): number[] {
  const factors: number[] = [];

  // Get the list of prime numbers up to our value
  const primes: number[] = sieveOfEratosthenes(value);

  let currentValue = value;
  while (!primes.includes(currentValue)) {
    for (const prime of primes) {
      if (isDivisibleBy(currentValue, prime)) {
        factors.push(prime);
        currentValue /= prime;
        break;
      }
    }
  }

  // Whatever we are left with is a prime
  factors.push(currentValue);

  return factors;
}
