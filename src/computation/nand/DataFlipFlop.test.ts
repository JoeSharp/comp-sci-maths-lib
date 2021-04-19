import DataFlipFlop from './DataFlipFlop';

describe('D-Type Flip Flop', () => {
    test('Simple', () => {
        const receiver = jest.fn();
        const dff = new DataFlipFlop();

        dff.connectOut(receiver);

        // Send some values, but no clock
        dff.sendInput(false);
        dff.sendInput(true);
        dff.sendInput(false);

        expect(receiver).toBeCalledTimes(0);

        dff.ticktock();
        expect(receiver).toHaveBeenCalledWith(false);

        dff.sendInput(true);
        dff.sendInput(false);
        dff.sendInput(true);
        dff.ticktock();
        expect(receiver).toHaveBeenLastCalledWith(true);

        // Two clocks should have resulted in two outputs
        expect(receiver).toBeCalledTimes(2);
    })
})