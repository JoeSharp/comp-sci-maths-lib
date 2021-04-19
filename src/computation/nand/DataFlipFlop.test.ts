import DataFlipFlop, { OneBitRegister } from './DataFlipFlop';
import { Mux } from './nand';

describe('D-Type Flip Flop', () => {
    test('Simple', () => {
        const receiver = jest.fn();
        const dff = new DataFlipFlop();

        dff.connectOutput(receiver);

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
    });


    test('1-bit Register', () => {
        const receiver = jest.fn();
        const register = new OneBitRegister();
        register.connectOutput(receiver);

        register.sendInput(false);
        register.sendInput(true);
        register.sendInput(false);
        register.sendLoad(true);
        expect(receiver).toHaveBeenCalledTimes(0);
        register.ticktock();
        expect(receiver).toHaveBeenCalledWith(false); // first call
        register.sendInput(true);
        register.ticktock();
        expect(receiver).toHaveBeenCalledWith(true); // second time
        register.sendLoad(false);
        register.sendInput(false);
        expect(receiver).toHaveBeenCalledTimes(2); // from before




    })
})