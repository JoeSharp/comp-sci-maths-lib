import algorithms from "./index";
import { generateRandomNumbers } from "../../common";
import { SortObserver, PositionVars } from "../../../types";

// Associate each sort algorithm with a name so they can all be tested in same function

// Create a test for each algorithm
algorithms.forEach(({ name, sort }) => {
  test(`Sort Numbers (with telemetry): ${name}`, () => {
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
