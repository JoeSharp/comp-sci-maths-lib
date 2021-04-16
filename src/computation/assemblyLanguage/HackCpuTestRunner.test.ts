import { readFileSync } from "fs";
import HackCpu from "./HackCpu";

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

    const cpu = new HackCpu();
    const runner = new HackCpuTestRunner(cpu, fileLoader);
    runner.loadScript(testScriptRaw);

    runner.runToEnd();
  });
});
