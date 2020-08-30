import monitoredAlgorithms from "./monitoredSearch";
import genericAlgorithms from "./genericSearch";
import { NO_MATCH } from "./common";
import { arithmeticComparator, generateRandomNumbers } from "../../common";

genericAlgorithms.forEach(({ name, search }) => {
  test(`${name} - Numbers (generic)`, () => {
    // Generate a list of random numbers
    const inputList: number[] = generateRandomNumbers(0, 100, 20);
    inputList.sort(arithmeticComparator);

    // Search for some specific indices
    [1, 10, 14, 19].forEach((index) => {
      // Search for the 15th one
      const result: number = search(inputList, (d) => inputList[index] - d);

      // If the number matches twice, the indexes may not match
      expect(inputList[result]).toBe(inputList[index]);
    });

    // Search with criteria that will never match
    const indexNoMatch: number = search(inputList, () => NO_MATCH);
    expect(indexNoMatch).toBe(NO_MATCH);
  });
});

monitoredAlgorithms.forEach(({ name, search }) => {
  test(`${name} - Numbers (monitored)`, () => {
    // Generate a list of random numbers
    const inputList: number[] = generateRandomNumbers(0, 100, 20);
    inputList.sort(arithmeticComparator);

    // Search for some specific indices
    [1, 10, 14, 19].forEach((index) => {
      // Search for the 15th one
      const result: number = search(inputList, {
        match: (d) => inputList[index] - d,
      });

      // If the number matches twice, the indexes may not match
      expect(inputList[result]).toBe(inputList[index]);
    });

    // Search with criteria that will never match
    const indexNoMatch: number = search(inputList, { match: () => NO_MATCH });
    expect(indexNoMatch).toBe(NO_MATCH);
  });
});
