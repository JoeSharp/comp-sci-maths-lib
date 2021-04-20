import { Clock } from '../Clocked';
import OneBitRegister from './OneBitRegister';

describe('D-Type Flip Flop', () => {
    test('1-bit Register', () => {
        const receiver = jest.fn();
        const clock = new Clock();
        const register = new OneBitRegister(clock);
        register.connectOutput(receiver);

        register.sendInput(false);
        register.sendInput(true);
        register.sendInput(false);
        register.sendLoad(true);
        expect(receiver).toHaveBeenCalledTimes(0);
        clock.ticktock();
        expect(receiver).toHaveBeenCalledWith(false); // first call
        register.sendInput(true);
        clock.ticktock();
        expect(receiver).toHaveBeenCalledWith(true); // second time
        register.sendLoad(false);
        register.sendInput(false);
        expect(receiver).toHaveBeenCalledTimes(2); // from before
    });
})