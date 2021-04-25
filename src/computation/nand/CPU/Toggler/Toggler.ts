import Chip from "../../Chip";
import { Clock } from "../../Clocked";
import Not from "../../Logic/Not";
import Bit from "../../Memory/Bit";
import { PIN_INPUT, PIN_LOAD, PIN_OUTPUT } from "../../types";

class Toggler extends Chip {
  not: Not;
  bit: Bit;

  constructor(clock: Clock) {
    super("Toggler");

    this.not = new Not();
    this.bit = new Bit(clock);

    // Internal Wiring
    this.not.connectToPin(PIN_OUTPUT, this.bit.getPin(PIN_INPUT));
    this.bit.connectToPin(PIN_OUTPUT, this.not.getPin(PIN_INPUT));

    // External Wiring
    this.createPin(PIN_OUTPUT, this.bit.getPin(PIN_OUTPUT));

    this.bit.sendToPin(PIN_LOAD, true);
  }
}

export default Toggler;
