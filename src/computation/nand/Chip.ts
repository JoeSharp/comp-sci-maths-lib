import BinaryPin from "./BinaryPin";
import BinaryBus from "./BinaryBus";

class Chip {
  name: string;
  pins: {
    [name: string]: BinaryPin;
  };
  buses: {
    [name: string]: BinaryBus;
  };

  constructor(name: string) {
    this.name = name;
    this.pins = {};
    this.buses = {};
  }

  createPin(name: string, ...pins: BinaryPin[]) {
    if (name in this.pins)
      throw new Error(`Pin already exists on ${this.name}: ${name}`);

    // Single output
    if (pins.length === 1) {
      this.pins[name] = pins[0];
      return;
    }

    // Multiple Outputs, create a splitter
    if (pins.length > 1) {
      this.pins[name] = new BinaryPin().connect(...pins);
      return;
    }
  }

  createBus(name: string, bus: BinaryBus) {
    if (name in this.buses)
      throw new Error(`Pin already exists on ${this.name}: ${name}`);

    this.buses[name] = bus;
  }

  getBus(
    name: string,
    startIndex: number = 0,
    endIndex: number = -1
  ): BinaryBus {
    if (!(name in this.buses))
      throw new Error(`Output Bus ${name} doesn't exist on ${this.name}`);
    const bus = this.buses[name];

    if (endIndex !== -1) {
      return bus.slice(startIndex, endIndex);
    }

    if (startIndex > 0) {
      return bus.slice(startIndex);
    }

    return bus;
  }

  getPin(name: string): BinaryPin {
    if (!(name in this.pins))
      throw new Error(`Pin ${name} doesn't exist on ${this.name}`);
    return this.pins[name];
  }
}

export default Chip;
