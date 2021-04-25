import { binaryToNumber } from "../../../../dataRepresentation/numberBases/simpleBinary";
import BinaryBus from "../../BinaryBus";
import { Clock } from "../../Clocked";
import { generateRandomWord, PIN_OUTPUT } from "../../types";
import PC, { PIN_INCREMENT } from "./PC";

describe("Program Counter", () => {
  test("Simple", () => {
    const clock = new Clock();
    const pc = new PC(clock);
    const jumpAddress = generateRandomWord();

    const sink = new BinaryBus();
    pc.getBus(PIN_OUTPUT).connect(sink);
    pc.getPin(PIN_INCREMENT).send(true);

    const pcValue = () => binaryToNumber(sink.getValue());
    expect(pcValue()).toBe(0);

    clock.ticktock();
    expect(pcValue()).toBe(1);

    clock.ticktock();
    expect(pcValue()).toBe(2);
  });
});
