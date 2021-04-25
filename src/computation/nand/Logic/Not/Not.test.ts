import Not from ".";
import { BinaryPin } from "../../BinaryPin";
import { PIN_INPUT, PIN_OUTPUT } from "../../types";

describe("NOT", () => {
  test("Simple", () => {
    const receiver = new BinaryPin();
    const not = new Not();
    not.getPin(PIN_OUTPUT).connect(receiver);

    not.getPin(PIN_INPUT).send(false);
    expect(receiver.lastOutput).toBe(true);

    not.getPin(PIN_INPUT).send(true);
    expect(receiver.lastOutput).toBe(false);

    not.getPin(PIN_INPUT).send(false);
    expect(receiver.lastOutput).toBe(true);
  });
});
