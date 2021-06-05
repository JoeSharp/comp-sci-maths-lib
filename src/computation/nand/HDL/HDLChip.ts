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

        // CHIP Nand {
        //   IN a, b;
        //   OUT out;

        //   PARTS:
        //   Nand(a=a, b=b, out=out);

        //   chipName(inputName=outputName, );
        // }

        this.subChips = hdl.codeLines.map(({ chipName, parameters }) => {
            if (!(chipName in chipFactory)) return;

            const chipProducer = chipFactory[chipName];
            const subChip = chipProducer(clock);
            parameters.forEach(({ inputName, outputName, outputFrom, outputTo }) => {
                for (let p = outputFrom; p <= outputTo; p++) {
                    this.getPin(outputName, p).connectRecipient(subChip.getPin(inputName, p - outputFrom));
                }
            })

            return subChip;
        });
    }
}

export default HDLChip