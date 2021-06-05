import Clock from "../Clock";
import Chip from "../Chip";
import { HdlChip } from "./types";
import chipFactory from "../chipFactory";

class HDLChip extends Chip {
    subChips: Chip[];

    constructor(hdl: HdlChip, clock: Clock) {
        super(hdl.name,
            hdl.inputSpec.pinsAndBuses.map(x => x.name),
            hdl.outputSpec.pinsAndBuses.map(x => x.name));

        this.subChips = hdl.codeLines.map(({ chipName, parameters }) => {
            if (!(chipName in chipFactory)) return;

            // Not(in=a, out=notA);
            // SubChip(inputName=outputName, ...);
            //
            // And(a=aa[4..5], b=bb[5], out=outout[6]);
            // SubChip(inputName=outputName[outputFrom...outputTo], ...)

            const chipProducer = chipFactory[chipName];
            const subChip = chipProducer(clock);
            parameters.forEach(({ inputName, outputName, outputFrom, outputTo }) => {
                // Are we dealing with a bus or a pin?
                if (inputName in subChip.buses) {
                    if (!(outputName in this.buses)) {
                        this.createBus
                    }
                    this.getBus(outputName).connect(subChip.getBus(inputName), outputFrom, outputTo);

                        // Take our existing pin with this name, and connect to the sub chip
                        for (let p = outputFrom; p < outputTo; p++) {
                            this.getPin(outputName, p).connect(subChip.getPin(inputName, p));
                        }
                } else if (inputName in subChip.pins) {
                    // Create/Register it if doesn't already exist
                    if (!(outputName in this.pins) && !(outputName in this.buses)) {
                        // Register the sub chips pin at this layer
                        this.createPin(outputName, subChip.getPin(inputName));
                    } else {
                        // Take our existing pin with this name, and connect to the sub chip
                        this.getPin(outputName, outputFrom).connect(subChip.getPin(inputName, outputFrom));
                    }
                }
            })

            return subChip;
        });
    }
}

export default HDLChip