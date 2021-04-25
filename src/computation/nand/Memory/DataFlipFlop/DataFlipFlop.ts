import BinaryPin from "../../BinaryPin";
import Chip from "../../Chip";
import { Clock, IClocked } from "../../Clocked";

import { PIN_INPUT, PIN_OUTPUT } from "../../types";

class DataFlipFlop extends Chip implements IClocked {
  value: boolean;
  input: BinaryPin;
  output: BinaryPin;

  constructor(clock: Clock) {
    super("DFF");
    this.value = false;
    this.input = new BinaryPin();
    this.output = new BinaryPin();
    clock.registerClocked(this);

    this.createPin(PIN_INPUT, this.input);
    this.createPin(PIN_OUTPUT, this.output);
  }

  tick() {
    ((): undefined => undefined)(); // No-op
  }

  tock() {
    this.output.send(this.input.lastOutput);
  }
}

export default DataFlipFlop;
