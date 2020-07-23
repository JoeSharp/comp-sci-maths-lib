import * as winston from "winston";

import algorithms from "./index";
import {
  arithmeticComparator,
  generateRandomNumbers,
  objToString,
} from "../common";
import { SearchObserver } from "../../types";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

const observe: SearchObserver<number> = (
  index: number,
  value: number,
  positionVars: { [k: string]: number }
) => {
  logger.info(
    `Checking data[${index}]=${value}, Position Vars: ${objToString(
      positionVars
    )}`
  );
};

algorithms.forEach(({ name, search }) => {
  logger.info(`Running Sort Algorithm ${name}`);
  // Generate a list of random numbers
  const inputList: number[] = generateRandomNumbers(0, 100, 20);
  inputList.sort(arithmeticComparator);

  // Search for some specific indices
  [1, 10, 14, 19].forEach((index) => {
    logger.info(`Searching for inputList[${index}]=${inputList[index]}`);

    // Search for the 15th one
    const found = search(inputList, (d) => inputList[index] - d, observe);

    logger.info(`Found at ${found}`);
  });
});
