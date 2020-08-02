import sieveOfEratosthenes from "./sieveOfEratosthenes";
import { isDivisibleBy, isPrime } from "./divisibilityRules";
import Graph from "../../dataStructures/graph/Graph";

export function getPrimeFactors(value: number): number[] {
  const factors: number[] = [];

  // Get the list of prime numbers up to the square root of our value
  const primes: number[] = sieveOfEratosthenes(Math.ceil(Math.sqrt(value)));

  let currentValue = value;
  while (!isPrime(currentValue)) {
    const prime = primes.find((p) => isDivisibleBy(currentValue, p));
    if (prime === undefined)
      throw new Error(`Could not find a divisor for ${currentValue}`);
    factors.push(prime);
    currentValue /= prime;
  }

  // Whatever we are left with is a prime
  factors.push(currentValue);

  return factors;
}

interface PrimeFactor {
  key: number;
  value: number;
}

const primeFactorEquality = (a: PrimeFactor, b: PrimeFactor) => a.key === b.key;

export function getPrimeFactorTree(value: number): Graph<PrimeFactor> {
  const primeFactors: number[] = getPrimeFactors(value);
  const graph = new Graph<PrimeFactor>({
    equalityCheck: primeFactorEquality,
    vertexToString: (d) => d.value.toString(10),
  });

  let currentItem: PrimeFactor = {
    key: 0,
    value,
  };
  let k = 0;
  const nextKey = () => {
    k += 1;
    return k;
  };
  graph.addVertex(currentItem);
  primeFactors
    .slice(0, primeFactors.length - 1) // Skip the last one
    .forEach((factor) => {
      const newItem = {
        key: nextKey(),
        value: currentItem.value / factor,
      };
      graph.addUnidirectionalEdge(currentItem, {
        key: nextKey(),
        value: factor,
      });
      graph.addUnidirectionalEdge(currentItem, newItem);
      currentItem = newItem;
    });

  return graph;
}
