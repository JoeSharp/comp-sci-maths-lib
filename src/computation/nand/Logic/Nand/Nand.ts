import { Optional } from "../../../../types";
import { BinaryPin } from "../../BinaryPin";
import Chip from "../../Chip";

import { PIN_A, PIN_B, PIN_OUTPUT } from "../../types";

class Nand extends Chip {
  a: BinaryPin;
  b: BinaryPin;
  output: BinaryPin;

  constructor() {
    super("Nand");

    this.a = new BinaryPin().withNewValueObserver(() => this.updateValue());
    this.b = new BinaryPin().withNewValueObserver(() => this.updateValue());
    this.output = new BinaryPin().withNewOutputObserver(() =>
      this.updateValue(true)
    );
    this.updateValue();

    this.createInputPin(PIN_A, this.a);
    this.createInputPin(PIN_B, this.b);
    this.createOutputPin(PIN_OUTPUT, this.output);
  }

  updateValue(force: boolean = false) {
    const newValue = !(this.a.lastOutput && this.b.lastOutput);
    this.output.send(newValue, force);
  }
}

export default Nand;
