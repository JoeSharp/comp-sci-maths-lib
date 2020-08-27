import genericAlgorithms from "./genericSortAlgorithms";
import monitoredAlgorithms from "./monitoredSortAlgorithms";
import stringAlgorithms from './stringSortAlgorithms';
import { generateRandomNumbers, stringComparator, arithmeticComparator } from "../../common";
import { SortObserver } from "./types";
import { PositionVars } from "../../types";

stringAlgorithms.forEach(({ name, sort }) => {
  test(`Sort Strings (string): ${name}`, () => {
    const names: string[] = [
      "Lister",
      "Cat",
      "Kryten",
      "Rimmer",
      "Holly",
      "Kochanski",
    ];

    const sortedNames: string[] = sort(names);

    expect(sortedNames).toStrictEqual([
      "Cat",
      "Holly",
      "Kochanski",
      "Kryten",
      "Lister",
      "Rimmer",
    ]);
  })
});

genericAlgorithms.forEach(({ name, sort }) => {
  test(`Sort Strings (generic): ${name}`, () => {
    const names: string[] = [
      "Lister",
      "Cat",
      "Kryten",
      "Rimmer",
      "Holly",
      "Kochanski",
    ];

    const sortedNames: string[] = sort(names, stringComparator);

    expect(sortedNames).toStrictEqual([
      "Cat",
      "Holly",
      "Kochanski",
      "Kryten",
      "Lister",
      "Rimmer",
    ]);
  });

  test(`Sort Numbers (generic): ${name}`, () => {
    // Generate a list of random numbers
    const inputList: number[] = generateRandomNumbers(0, 100, 20);

    // Execute the sort
    const outputList: number[] = sort(inputList, arithmeticComparator);

    // Check all the input numbers are in there somewhere
    expect(outputList.length).toBe(inputList.length);
    inputList.forEach((i) => expect(outputList.includes(i)).toBeTruthy());

    // Check they are in order
    for (let i = 1; i < outputList.length; i++) {
      expect(outputList[i]).toBeGreaterThanOrEqual(outputList[i - 1]);
    }
  });
});

monitoredAlgorithms.forEach(({ name, sort }) => {
  test(`Sort Numbers (monitored): ${name}`, () => {
    // Generate a list of random numbers
    const inputList: number[] = generateRandomNumbers(0, 100, 20);

    const observe: SortObserver<number> = (
      stageName: string,
      data: number[],
      positionVars: PositionVars
    ) => {
      expect(data.length).toBe(inputList.length);
    };

    // Execute the sort
    const outputList: number[] = sort(inputList, {
      observe,
    });

    // Check all the input numbers are in there somewhere
    expect(outputList.length).toBe(inputList.length);
    inputList.forEach((i) => expect(outputList.includes(i)).toBeTruthy());

    // Check they are in order
    for (let i = 1; i < outputList.length; i++) {
      expect(outputList[i]).toBeGreaterThanOrEqual(outputList[i - 1]);
    }
  });
});
