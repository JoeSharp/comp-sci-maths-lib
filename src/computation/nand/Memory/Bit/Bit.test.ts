import BinaryPin from "../../BinaryPin";
import { Clock } from "../../Clocked";
import { PIN_INPUT, PIN_LOAD, PIN_OUTPUT } from "../../types";
import Bit from "./Bit";

describe("D-Type Flip Flop", () => {
  test("1-bit Register", () => {
    let callCount = 0;
    const receiver = new BinaryPin().withNewValueObserver(() => callCount++);
    const clock = new Clock();
    const register = new Bit(clock);
    register.getPin(PIN_OUTPUT).connect(receiver);

    register.getPin(PIN_INPUT).send(false);
    register.getPin(PIN_INPUT).send(true);
    register.getPin(PIN_INPUT).send(false);
    register.getPin(PIN_LOAD).send(true);
    expect(callCount).toBe(0);
    clock.ticktock();
    expect(callCount).toBe(1);
    expect(receiver.lastOutput).toBe(false); // first call
    register.getPin(PIN_INPUT).send(true);
    clock.ticktock();
    expect(receiver.lastOutput).toBe(true); // second time
    register.getPin(PIN_LOAD).send(false);
    register.getPin(PIN_INPUT).send(false);
    expect(callCount).toBe(2); // from before
    clock.ticktock();
    expect(receiver.lastOutput).toBe(true); // third call
    register.getPin(PIN_LOAD).send(true);
    clock.ticktock();
    expect(receiver.lastOutput).toBe(false); // fourth call
  });
});
