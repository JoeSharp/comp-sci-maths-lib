import { BinaryPin } from "./BinaryPin";
import { WORD_LENGTH } from "./types";

export const createPinArray = (width: number = WORD_LENGTH): BinaryPin[] =>
  Array(width)
    .fill(null)
    .map(() => new BinaryPin());

class BinaryBus {
  outputs: BinaryBus[];
  inputBus: BinaryPin[];

  constructor(inputBus: BinaryPin[] = createPinArray()) {
    this.outputs = [];

    this.inputBus = inputBus;
  }

  send(values: boolean[], startIndex: number = 0) {
    values.forEach((v, i) => {
      const index = i + startIndex;
      if (index >= this.inputBus.length)
        throw new Error(
          `Writing too much data ${values.length} starting at ${startIndex} to bus ${name} which is ${this.inputBus.length} bits wide`
        );
      this.inputBus[index].send(v);
    });
  }

  getPin(index: number = 0) {
    if (index > this.inputBus.length) {
      throw new Error(
        `Attempting to get bus pin ${index} with only ${this.inputBus.length} available`
      );
    }

    return this.inputBus[index];
  }

  connectPin(pin: BinaryPin, index: number = 0): BinaryBus {
    if (index > this.inputBus.length) {
      throw new Error(
        `Attempting to connect bus pin ${index} with only ${this.inputBus.length} available`
      );
    }

    this.inputBus[index].connect(pin);
    return this;
  }

  connect(
    bus: BinaryBus,
    startIndex: number = 0,
    endIndex: number = WORD_LENGTH
  ): BinaryBus {
    bus.inputBus.forEach((pin, i) => {
      const index = startIndex + i;

      if (index > this.inputBus.length) {
        throw new Error(
          `Attempting to connect bus pin ${index} with only ${this.inputBus.length} available`
        );
      }
      if (index <= endIndex) {
        this.inputBus[index].connect(pin);
      }
    });
    return this;
  }
}

export default BinaryBus;
