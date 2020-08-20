import algorithms from "./index";
import { generateRandomNumbers, simpleLogger } from "../../../common";
import {
  SortObserver,
  SplitObserver,
  JoinObserver,
  SplitList,
  PositionVars,
} from "../../../types";

algorithms
  .filter(({ name }) => name === "Merge Sort")
  .forEach(({ name, sort }) => {
    const inputList: number[] = generateRandomNumbers(0, 100, 20);
    simpleLogger.info(`Testing ${name} on data ${inputList}`);

    const observe: SortObserver<number> = (
      stageName: string,
      data: number[],
      positionVars: PositionVars
    ) => {
      simpleLogger.info(
        `Stage: ${stageName} with Data: ${data}, Positions Vars: ${JSON.stringify(
          positionVars
        )}`
      );
    };

    const split: SplitObserver<number> = (
      parentKey: string,
      listA: SplitList<number>,
      listB: SplitList<number>
    ) => {
      simpleLogger.info(
        `Splitting ${parentKey} -> ${listA.key}=${listA.data} and ${listB.key}=${listB.data}`
      );
    };
    const join: JoinObserver<number> = (
      parentKey: string,
      listAKey: string,
      listBKey: string,
      joinedList: number[]
    ) => {
      simpleLogger.info(
        `Joining ${parentKey}, ${listAKey} + ${listBKey} -> ${joinedList}`
      );
    };

    // Execute the sort
    const outputList: number[] = sort(inputList, {
      observe,
      split,
      join,
    });
  });
