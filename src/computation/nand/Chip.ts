import BinaryPin from "./BinaryPin";
import BinaryBus from "./BinaryBus";

class Chip {
  name: string;
  inputs: string[];
  outputs: string[];
  pins: {
    [name: string]: BinaryPin;
  };
  buses: {
    [name: string]: BinaryBus;
  };

  constructor(name: string, inputs: string[], outputs: string[]) {
    this.name = name;
    this.inputs = inputs;
    this.outputs = outputs;
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
      this.pins[name] = new BinaryPin().connectRecipient(...pins);
      return;
    }
  }

  createBus(name: string, bus: BinaryBus) {
    if (name in this.buses)
      throw new Error(`Pin already exists on ${this.name}: ${name}`);

    this.buses[name] = bus;
  }

  getBus(name: string): BinaryBus {
    if (!(name in this.buses))
      throw new Error(`Output Bus ${name} doesn't exist on ${this.name}`);
    return this.buses[name];
  }

  getPin(name: string, index: number = 0): BinaryPin {
    // Are we asking for a single pin, and we don't already have a bus?
    if (!(name in this.buses) && index === 0) {
      // Do we have a pin already?
      if (!(name in this.pins)) {
        this.pins[name] = new BinaryPin();
      }

      return this.pins[name];
    }
    
    // At this point, we need a bus

    // Do we need to replace an existing pin with a bus?
    if (index > 0 && (name in this.pins)) {
      const existingPin = this.pins[name];
      delete this.pins.name;
      const bus = new BinaryBus([existingPin]);
      this.buses[name] = bus;
    }

    // If we literally haven't heard of this bus before, just create an empty one
    if (!(name in this.buses)) {
      this.buses[name] = new BinaryBus([]);
    }

    // Request this specific pin from the named bus
    return this.buses[name].getPin(index);
  }
}

export default Chip;
