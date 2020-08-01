import { StringReporter } from "../common";

export function isDivisibleBy(value: number, divisor: number): boolean {
  return value % divisor === 0;
}

export function getDigits(value: number, radix: number = 10): number[] {
  const asStr = value.toString();
  const digits: string[] = [];
  for (const c of asStr) {
    digits.push(c);
  }
  return digits.map((c) => parseInt(c, radix));
}

export function dividesBy3(value: number, report: StringReporter) {
  report(`Is ${value} divisible by 3?`);

  let currentValue = value;
  let digits = getDigits(currentValue);
  while (digits.length > 1) {
    currentValue = digits.reduce((acc, curr) => acc + curr, 0);

    report(`Number Digits ${digits.join(", ")} add up to ${currentValue}`);

    digits = getDigits(currentValue);
  }

  const by3 = isDivisibleBy(currentValue, 3);
  report(`Finished on Value ${currentValue}, divisible by 3?: ${by3}`);
}
