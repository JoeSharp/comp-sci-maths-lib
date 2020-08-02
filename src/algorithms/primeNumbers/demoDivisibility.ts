import { simpleLogger } from "../../common";
import { divisibilityRules } from "./divisibilityRules";
import { StringReporter } from "../../types";

const reportLog: StringReporter = (s) => simpleLogger.info(s);

const values: number[] = [234, 673937, 10912374];

reportLog("Testing Divisibility Reporters");
divisibilityRules.forEach(({ factor, rule }) => {
  reportLog(`Testing Divide By ${factor}`);

  values.forEach((value) => {
    rule(value * factor, reportLog);
    rule(value * factor + 1, reportLog);
  });
});
