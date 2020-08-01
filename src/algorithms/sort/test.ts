import algorithms from "./index";
import { generateRandomNumbers } from "../common";

// Associate each sort algorithm with a name so they can all be tested in same function

// Create a test for each algorithm
algorithms.forEach(({ name, sort }) => {
  test(`Sort Strings (basic): ${name}`, () => {
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
  });

  test(`Sort Numbers (basic): ${name}`, () => {
    // Generate a list of random numbers
    const inputList: number[] = generateRandomNumbers(0, 100, 20);

    // Execute the sort
    const outputList: number[] = sort(inputList);

    // Check all the input numbers are in there somewhere
    expect(outputList.length).toBe(inputList.length);
    inputList.forEach((i) => expect(outputList.includes(i)).toBeTruthy());

    // Check they are in order
    for (let i = 1; i < outputList.length; i++) {
      expect(outputList[i]).toBeGreaterThanOrEqual(outputList[i - 1]);
    }
  });
});
