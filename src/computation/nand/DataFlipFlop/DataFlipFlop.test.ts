import { Clock } from '../Clocked';
import { PIN_INPUT, PIN_OUTPUT } from '../types';
import DataFlipFlop from './DataFlipFlop';

describe('D-Type Flip Flop', () => {
    test('Simple', () => {
        const receiver = jest.fn();
        const clock = new Clock();
        const dff = new DataFlipFlop();
        clock.registerClocked(dff);

        dff.connectToOutputPin(PIN_OUTPUT, receiver);

        // Send some values, but no clock
        dff.sendToInputPin(PIN_INPUT, false);
        dff.sendToInputPin(PIN_INPUT, true);
        dff.sendToInputPin(PIN_INPUT, false);

        expect(receiver).toBeCalledTimes(0);

        clock.ticktock();
        expect(receiver).toHaveBeenCalledWith(false);

        dff.sendToInputPin(PIN_INPUT, true);
        dff.sendToInputPin(PIN_INPUT, false);
        dff.sendToInputPin(PIN_INPUT, true);
        dff.tick();
        dff.tock();
        expect(receiver).toHaveBeenLastCalledWith(true);

        // Two clocks should have resulted in two outputs
        expect(receiver).toBeCalledTimes(2);
    });
})