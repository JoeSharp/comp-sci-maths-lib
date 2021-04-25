import { Clock } from "../../Clocked";
import PinSink from "../../PinSink";
import { PIN_OUTPUT } from "../../types";
import Toggler from "./Toggler";

describe("Toggler", () => {
  test("Simple", () => {
    const clock = new Clock();
    const toggler = new Toggler(clock);
    const sink = new PinSink();
    expect(sink.getValue()).toBe(false);
    toggler.connectToPin(PIN_OUTPUT, sink.getPin());

    for (let x = 0; x < 10; x++) {
      expect(sink.getValue()).toBe(false);
      clock.ticktock();
      expect(sink.getValue()).toBe(true);
      clock.ticktock();
    }
  });
});
