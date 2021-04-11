import { readFileSync } from "fs";

import HackCpuTestRunner from "./HackCpuTestRunner";
import { FileLoader } from "./types";

describe("Hack CPU Test Script Runner", () => {
  test("Multiplication", () => {
    const fileLoader: FileLoader = (filename: string) =>
      readFileSync(
        `src/computation/assemblyLanguage/testData/mult/${filename}`,
        "utf-8"
      );
    const testScriptRaw = fileLoader("Mult.tst");

    const runner = new HackCpuTestRunner(fileLoader);
    runner.loadScript(testScriptRaw);

    runner.runToEnd();
  });
});
