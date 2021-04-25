import { Clock } from "../../Clocked";
import {
  generateRandomWord,
  PIN_ADDRESS,
  PIN_INPUT,
  PIN_LOAD,
  PIN_OUTPUT,
  WORD_LENGTH,
} from "../../types";
import RAM64 from "./RAM64";

interface TestData {
  address: boolean[];
  content: boolean[];
}

describe("RAM64", () => {
  test("Simple", () => {
    const receivers = Array(WORD_LENGTH)
      .fill(null)
      .map(() => jest.fn());
    const clock = new Clock();
    const ram = new RAM64(clock);
    ram.connectToBus(PIN_OUTPUT, receivers);
    const testData = [
      {
        address: [false, false, true, false, true, false],
        content: generateRandomWord(),
      },
      {
        address: [false, true, true, false, true, false],
        content: generateRandomWord(),
      },
      {
        address: [true, false, true, true, true, false],
        content: generateRandomWord(),
      },
    ];

    ram.sendToPin(PIN_LOAD, true);
    ram.sendToBus(PIN_INPUT, testData[0].content);
    ram.sendToBus(PIN_ADDRESS, testData[0].address);
    clock.ticktock();
    receivers.forEach((r, i) =>
      expect(r).toHaveBeenLastCalledWith(testData[0].content[i])
    );

    ram.sendToBus(PIN_INPUT, testData[1].content);
    ram.sendToBus(PIN_ADDRESS, testData[1].address);
    clock.ticktock();
    receivers.forEach((r, i) =>
      expect(r).toHaveBeenLastCalledWith(testData[1].content[i])
    );

    ram.sendToBus(PIN_INPUT, testData[2].content);
    ram.sendToBus(PIN_ADDRESS, testData[2].address);
    clock.ticktock();
    receivers.forEach((r, i) =>
      expect(r).toHaveBeenLastCalledWith(testData[2].content[i])
    );

    // Back to word1
    ram.sendToPin(PIN_LOAD, false);
    ram.sendToBus(PIN_ADDRESS, testData[0].address);
    clock.ticktock();
    receivers.forEach((r, i) =>
      expect(r).toHaveBeenLastCalledWith(testData[0].content[i])
    );
  });
});
