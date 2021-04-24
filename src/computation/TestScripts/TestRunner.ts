import { FileLoader, ScriptParser, TestScript } from "./types";
import Stack from "../../dataStructures/stack/Stack";
import { Optional } from "../../types";
import { formatString } from "./parseTestScripts";

export default abstract class TestRunner<
  UNDER_TEST,
  TEST_INSTRUCTION,
  TEST_SCRIPT extends TestScript<TEST_INSTRUCTION>
> {
  scriptParser: ScriptParser<TEST_SCRIPT>;
  fileLoader: FileLoader;
  objectUnderTest: UNDER_TEST;
  testScript: TEST_SCRIPT;
  commandStack: Stack<TEST_INSTRUCTION[]>;
  compareTo: string[];
  testOutput: string[];
  lastInstruction: Optional<TEST_INSTRUCTION>;

  constructor(
    objectUnderTest: UNDER_TEST,
    fileLoader: FileLoader,
    scriptParser: ScriptParser<TEST_SCRIPT>
  ) {
    this.fileLoader = fileLoader;
    this.objectUnderTest = objectUnderTest;
    this.scriptParser = scriptParser;
  }

  reset() {
    this.testOutput = [];
    this.commandStack = new Stack();
    this.commandStack.push([...this.testScript.testInstructions]);
    this.compareTo = this.fileLoader(this.testScript.compareTo)
      .split("\n")
      .map((s) => s.trim());
    const log = this.testScript.outputList
      .map(({ heading, spacing }) => formatString(heading, spacing))
      .join("|");
    this.addToLog(`|${log}|`);
  }

  loadScript(data: string) {
    this.testScript = this.scriptParser(data);

    const program = this.fileLoader(this.testScript.load);
    this.loadProgram(program);

    this.reset();
  }

  abstract loadProgram(program: string): void;

  addToLog(log: string) {
    if (this.testOutput.length >= this.compareTo.length) {
      throw new Error(
        `Too many log lines output from test, expecting ${this.compareTo.length}`
      );
    }

    // Check against compareTo
    const nextCompareLine = this.compareTo[this.testOutput.length];
    if (nextCompareLine !== log) {
      throw new Error(
        `Comparing Failure on Line ${this.testOutput.length}\n\tExpected: ${nextCompareLine}\n\tReceived: ${log}`
      );
    }

    // Assume all is good
    this.testOutput.push(log);
  }

  step(toEnd: boolean = false) {
    while (!this.commandStack.isEmpty()) {
      while (this.commandStack.peek().length > 0) {
        const instruction = this.commandStack.peek().shift();
        this.runInstruction(instruction);
        if (!toEnd) return; // Just run one command
      }

      this.commandStack.pop();
    }
  }

  runToEnd() {
    this.step(true);
  }

  abstract runInstruction(instruction: TEST_INSTRUCTION): void;
}
