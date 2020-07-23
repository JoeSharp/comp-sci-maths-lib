import * as winston from "winston";

import algorithms from "./index";
import {
  generateRandomNumbers,
  arithmeticComparator,
  objToString,
} from "../common";
import { SortObserver } from "../../types";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

// Create a test for each algorithm
algorithms.forEach(({ name, sort }) => {
  logger.info(`Running Sort Algorithm ${name}`);

  // Generate a list of random numbers
  const inputList: number[] = generateRandomNumbers(0, 100, 10);

  const observer: SortObserver<number> = (
    stageName: string,
    data: number[],
    positionVars: { [k: string]: number }
  ) => {
    logger.info(
      `${stageName}: Data: ${JSON.stringify(
        data
      )}, Position Vars: ${objToString(positionVars)}`
    );
  };

  // Execute the sort
  sort(inputList, arithmeticComparator, observer);
});
