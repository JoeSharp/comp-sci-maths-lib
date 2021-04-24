import { binaryToNumber } from "../../../../dataRepresentation/numberBases/simpleBinary";
import BusSink from "../../BusSink";
import { Clock } from "../../Clocked";
import { generateRandomWord, PIN_OUTPUT } from "../../types";
import PC from "./PC"

describe('Program Counter', () => {
    test('Simple', () => {
        const clock = new Clock();
        const pc = new PC(clock);
        const jumpAddress = generateRandomWord();

        const sink = new BusSink();
        pc.connectToOutputBus(PIN_OUTPUT, sink.getBus());

        const pcValue = () => binaryToNumber(sink.getValues());
        expect(pcValue()).toBe(0);

        clock.ticktock();
        expect(pcValue()).toBe(1);

        clock.ticktock();
        expect(pcValue()).toBe(2);
    })
})