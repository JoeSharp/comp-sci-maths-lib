import Clock from "../Clock";
import Chip from "../Chip";
import { HdlChip } from "./types";
import chipFactory from "../chipFactory";
import BinaryPin from "../BinaryPin";

class HDLChip extends Chip {
    subChips: Chip[];

    constructor(hdl: HdlChip, clock: Clock) {
        super(hdl.name, hdl.inputSpec.pins, hdl.outputSpec.pins);

        this.subChips = hdl.codeLines.map(({ chipName, parameters }) => {
            if (!(chipName in chipFactory)) return;

            const chipProducer = chipFactory[chipName];
            const subChip = chipProducer(clock);
            parameters.forEach(({ inputName, outputName }) => {
                // Create if doesn't already exist
                if (!(outputName in this.pins)) {
                    this.createPin(outputName, subChip.getPin(inputName));
                } else {
                    this.getPin(outputName).connect(subChip.getPin(inputName))
                }
            })

            return subChip;
        });
    }
}

export default HDLChip