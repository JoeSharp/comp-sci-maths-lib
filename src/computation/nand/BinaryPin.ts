import { Optional } from "../../types";
import { NO_OP } from "../TestScripts/types";
import { WORD_LENGTH } from "./types";

export class BinaryPin {
  lastOutput: Optional<boolean>;
  receivers: BinaryPin[] = [];
  newOutputObserver: () => void;
  newValueObserver: () => void;

  constructor(receivers: BinaryPin[] = []) {
    receivers.forEach((r) => this.receivers.push(r));
    this.newOutputObserver = NO_OP;
    this.newValueObserver = NO_OP;
  }

  withNewOutputObserver(o: () => void): BinaryPin {
    this.newOutputObserver = o;
    return this;
  }

  withNewValueObserver(o: () => void): BinaryPin {
    this.newValueObserver = o;
    return this;
  }

  connectOutput(...receivers: BinaryPin[]): BinaryPin {
    receivers.forEach((r) => this.receivers.push(r));
    this.newOutputObserver();
    return this;
  }

  send(newValue: boolean, force: boolean = false): BinaryPin {
    if (force || !this.lastOutput || newValue !== this.lastOutput) {
      this.lastOutput = newValue;
      this.receivers.forEach((r) => r.send(newValue));
      this.newValueObserver();
    }
    return this;
  }
}

export default BinaryPin;

export const createBus = (width: number = WORD_LENGTH): BinaryBus =>
  Array(width)
    .fill(null)
    .map(() => new BinaryPin());

export type BinaryBus = BinaryPin[];
