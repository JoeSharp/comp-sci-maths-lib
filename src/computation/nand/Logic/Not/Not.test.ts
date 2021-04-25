import Not from ".";
import { BinaryPin } from "../../BinaryPin";
import { PIN_INPUT, PIN_OUTPUT } from "../../types";

describe("NOT", () => {
  test("Simple", () => {
    const receiver = new BinaryPin();
    const not = new Not();
    not.connectToOutputPin(PIN_OUTPUT, receiver);

    not.sendToInputPin(PIN_INPUT, false);
    expect(receiver.lastOutput).toBe(true);

    not.sendToInputPin(PIN_INPUT, true);
    expect(receiver.lastOutput).toBe(false);

    not.sendToInputPin(PIN_INPUT, false);
    expect(receiver.lastOutput).toBe(true);
  });
});
