import { simpleLogger } from "../../common";
import { divisibilityRules } from "./divisibilityRules";
import { StringReporter } from "../../types";

const reportLog: StringReporter = (s) => simpleLogger.info(s);

const values: number[] = [234, 673937, 10912374];

reportLog("Testing Divisibility Reporters");
divisibilityRules.forEach(({ factor, reporter }) => {
  reportLog(`Testing Divide By ${factor}`);

  values.forEach((value) => {
    reporter(value * factor, reportLog);
    reporter(value * factor + 1, reportLog);
  });
});
