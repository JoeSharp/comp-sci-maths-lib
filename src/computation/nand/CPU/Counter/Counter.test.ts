import { binaryToBoolArray, binaryToNumber } from "../../../../dataRepresentation/numberBases/simpleBinary";
import BusSink from "../../BusSink";
import { Clock } from "../../Clocked";
import { PIN_INPUT, PIN_OUTPUT, WORD_LENGTH } from "../../types";
import Counter from "./Counter"

describe('Counter', () => {
    test('Simple', () => {
        const clock = new Clock();
        const counter = new Counter(clock);

        // const receivers = Array(WORD_LENGTH).fill(null).map(() => jest.fn());
        // counter.connectToOutputBus(PIN_OUTPUT, receivers);

        // clock.ticktock();
        // [true, false, false, false].forEach((v, i) => expect(receivers[i]).toHaveBeenLastCalledWith(v));
        // clock.ticktock();
        // [false, true, false, false].forEach((v, i) => expect(receivers[i]).toHaveBeenLastCalledWith(v));

        const sink = new BusSink();
        counter.connectToOutputBus(PIN_OUTPUT, sink.getBus());

        // counter.sendToInputBus(PIN_INPUT, sink.getValues());
        const countValue = () => binaryToNumber(sink.getValues());
        expect(countValue()).toBe(0);
    
        clock.ticktock();
        console.log(`Value: ${countValue()} - ${sink.getValues()}`);
        expect(countValue()).toBe(1);
        // counter.sendToInputBus(PIN_INPUT, sink.getValues());

        clock.ticktock();
        expect(countValue()).toBe(2);
    })
})