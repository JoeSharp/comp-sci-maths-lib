import { booleanToBinArray } from "../../../../dataRepresentation/numberBases/simpleBinary";
import BinaryBus from "../../BinaryBus";
import { Clock } from "../../Clocked";
import { PIN_OUTPUT } from "../../types";
import Counter from "./Counter";

describe("Counter", () => {
  test("Simple", () => {
    const clock = new Clock();
    const counter = new Counter(clock);

    const outputMonitor = new BinaryBus();
    counter.getBus(PIN_OUTPUT).connect(outputMonitor);

    // counter.sendToBus(PIN_INPUT, sink.getValues());
    const getRegisterValue = () =>
      booleanToBinArray(counter.register.getBus(PIN_OUTPUT).getValue());
    const getIncrementerValue = () =>
      booleanToBinArray(counter.incrementer.getBus(PIN_OUTPUT).getValue());
    const getOutputValue = () => booleanToBinArray(outputMonitor.getValue());

    const printState = () => {
      console.log(
        "State",
        JSON.stringify(
          {
            incrementer: getIncrementerValue(),
            register: getRegisterValue(),
            output: getOutputValue(),
          },
          null,
          2
        )
      );
    };

    // expect(getOutputValue()).toBe("0000000000000000");

    clock.ticktock();
    printState();
    clock.ticktock();
    printState();
    clock.ticktock();
    printState();
    clock.ticktock();
    printState();
    clock.ticktock();
    printState();
    expect(getOutputValue()).toBe("0000000000000001");
    // counter.sendToBus(PIN_INPUT, sink.getValues());

    clock.ticktock();
    expect(getOutputValue()).toBe("0000000000000010");
  });
});
