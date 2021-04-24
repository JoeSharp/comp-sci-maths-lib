import { Clock } from '../../Clocked';
import { PIN_INPUT, PIN_LOAD, PIN_OUTPUT } from '../../types';
import Bit from './Bit';

describe('D-Type Flip Flop', () => {
    test('1-bit Register', () => {
        const receiver = jest.fn();
        const clock = new Clock();
        const register = new Bit(clock);
        register.connectToOutputPin(PIN_OUTPUT, receiver);

        register.sendToInputPin(PIN_INPUT, false);
        register.sendToInputPin(PIN_INPUT, true);
        register.sendToInputPin(PIN_INPUT, false);
        register.sendToInputPin(PIN_LOAD, true);
        expect(receiver).toHaveBeenCalledTimes(0);
        clock.ticktock();
        expect(receiver).toHaveBeenCalledTimes(1);
        expect(receiver).toHaveBeenCalledWith(false); // first call
        register.sendToInputPin(PIN_INPUT, true);
        clock.ticktock();
        expect(receiver).toHaveBeenCalledWith(true); // second time
        register.sendToInputPin(PIN_LOAD, false);
        register.sendToInputPin(PIN_INPUT, false);
        expect(receiver).toHaveBeenCalledTimes(2); // from before
        clock.ticktock();
        expect(receiver).toHaveBeenCalledWith(false); // third call
    });
})