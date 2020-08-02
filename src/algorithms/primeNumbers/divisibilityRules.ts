import { StringReporter, DivisibilityReporters } from "../../types";
import { assert } from "console";

export function isDivisibleBy(value: number, divisor: number): boolean {
  return value % divisor === 0;
}

export function isPrime(value: number) {
  // Calculate the square root, any factors will exist below this value
  // Round up so we include the square root...
  const sqRoot = Math.ceil(Math.sqrt(value));

  // From 2 up to the square root, check for divisibility
  for (let i = 2; i <= sqRoot; i++) {
    if (isDivisibleBy(value, i)) {
      return false;
    }
  }

  return true;
}

export function getDigits(value: number, radix: number = 10): number[] {
  if (value < 0) {
    return [];
  }

  const asStr = value.toString();
  const digits: string[] = [];
  for (const c of asStr) {
    digits.push(c);
  }
  return digits.map((c) => parseInt(c, radix));
}

export function dividesBy2(value: number, report: StringReporter): boolean {
  report(`Is ${value} divisible by 2?`);

  const digits = getDigits(value);
  const leastSignificantDigit = digits[digits.length - 1];

  const isDiv = [8, 6, 4, 2, 0].includes(leastSignificantDigit);
  const isDivMod = isDivisibleBy(value, 2);
  report(
    `Least Significant Digit is ${leastSignificantDigit}, divisible by 2?: ${isDiv}, Agrees with mod? ${
      isDiv === isDivMod ? "YES" : "NO"
    }`
  );

  return isDiv === isDivMod;
}

export function dividesBy3(value: number, report: StringReporter): boolean {
  report(`Is ${value} divisible by 3?`);

  let currentValue = value;
  let digits = getDigits(currentValue);
  while (digits.length > 1 && currentValue > 0) {
    currentValue = digits.reduce((acc, curr) => acc + curr, 0);

    report(`Digits ${digits.join(", ")} add up to ${currentValue}`);

    digits = getDigits(currentValue);
  }

  const isDiv = [9, 6, 3, 0].includes(currentValue);
  const isDivMod = isDivisibleBy(value, 3);
  report(
    `Finished on Value ${currentValue}, divisible by 3?: ${isDiv}, Agrees with mod? ${
      isDiv === isDivMod ? "YES" : "NO"
    }`
  );

  return isDiv === isDivMod;
}

export function dividesBy5(value: number, report: StringReporter): boolean {
  report(`Is ${value} divisible by 5?`);

  const digits = getDigits(value);
  const leastSignificantDigit = digits[digits.length - 1];

  const isDiv = [5, 0].includes(leastSignificantDigit);
  const isDivMod = isDivisibleBy(value, 5);
  report(
    `Least Significant Digit is ${leastSignificantDigit}, divisible by 5?: ${isDiv}, Agrees with mod? ${
      isDiv === isDivMod ? "YES" : "NO"
    }`
  );

  return isDiv === isDivMod;
}

export function dividesBy7(value: number, report: StringReporter): boolean {
  report(`Is ${value} divisible by 7?`);

  let currentValue = value;
  let digits = getDigits(currentValue);
  while (digits.length > 2 && currentValue > 0) {
    const leastSignificantDigit = digits[digits.length - 1];
    const restOfNumber = Math.floor(currentValue / 10); // lops off the last digit

    report(
      `Current Value: ${currentValue}, Digits: ${digits} Least significant Digit ${leastSignificantDigit} subtract from ${restOfNumber}`
    );
    currentValue = restOfNumber - leastSignificantDigit * 2;

    digits = getDigits(currentValue);
  }

  const isDiv = isDivisibleBy(currentValue, 7);
  const isDivMod = isDivisibleBy(value, 7);
  report(
    `Finished on Value ${currentValue}, divisible by 7?: ${isDiv}, Agrees with mod? ${
      isDiv === isDivMod ? "YES" : "NO"
    }`
  );

  return isDiv === isDivMod;
}

export const divisibilityReporters: DivisibilityReporters[] = [
  {
    factor: 2,
    reporter: dividesBy2,
  },
  {
    factor: 3,
    reporter: dividesBy3,
  },
  {
    factor: 5,
    reporter: dividesBy5,
  },
  {
    factor: 7,
    reporter: dividesBy7,
  },
];
