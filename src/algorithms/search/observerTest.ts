import { simpleLogger } from "../../common";

import algorithms from "./index";
import {
  arithmeticComparator,
  generateRandomNumbers,
  objToString,
} from "../common";
import { SearchObserver } from "../../types";

const observe: SearchObserver<number> = (
  index: number,
  value: number,
  positionVars: { [k: string]: number }
) => {
  simpleLogger.info(
    `Checking data[${index}]=${value}, Position Vars: ${objToString(
      positionVars
    )}`
  );
};

algorithms.forEach(({ name, search }) => {
  simpleLogger.info(`Running Sort Algorithm ${name}`);
  // Generate a list of random numbers
  const inputList: number[] = generateRandomNumbers(0, 100, 20);
  inputList.sort(arithmeticComparator);

  // Search for some specific indices
  [1, 10, 14, 19].forEach((index) => {
    simpleLogger.info(`Searching for inputList[${index}]=${inputList[index]}`);

    // Search for the 15th one
    const found = search(inputList, (d) => inputList[index] - d, observe);

    simpleLogger.info(`Found at ${found}`);
  });
});
