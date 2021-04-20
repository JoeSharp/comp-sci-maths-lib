import { Clock } from '../Clocked';
import DataFlipFlop from './DataFlipFlop';

describe('D-Type Flip Flop', () => {
    test('Simple', () => {
        const receiver = jest.fn();
        const clock = new Clock();
        const dff = new DataFlipFlop();
        clock.registerClocked(dff);

        dff.connectOutput(receiver);

        // Send some values, but no clock
        dff.sendInput(false);
        dff.sendInput(true);
        dff.sendInput(false);

        expect(receiver).toBeCalledTimes(0);

        clock.ticktock();
        expect(receiver).toHaveBeenCalledWith(false);

        dff.sendInput(true);
        dff.sendInput(false);
        dff.sendInput(true);
        dff.tick();
        dff.tock();
        expect(receiver).toHaveBeenLastCalledWith(true);

        // Two clocks should have resulted in two outputs
        expect(receiver).toBeCalledTimes(2);
    });
})