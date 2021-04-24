import { binaryToNumber } from "../../dataRepresentation/numberBases/simpleBinary";
import BusSink from "./BusSink"

describe('Bus Sink', () => {
    test('Simple', () => {
        const sink = new BusSink();
        const countValue = () => binaryToNumber(sink.getValues());

        const bus = sink.getBus();
        bus[0](true);
        bus[1](false);
        bus[2](false);
        bus[3](false);
        bus[4](false);

        expect(countValue()).toBe(1);
        bus[1](true);
        expect(countValue()).toBe(3);
        bus[3](true);
        bus[0](false);
        expect(countValue()).toBe(10);
    })
})