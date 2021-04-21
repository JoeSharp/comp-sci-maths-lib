import Not from '.';
import { PIN_INPUT, PIN_OUTPUT } from '../types';

describe('NOT', () => {
    test('Simple', () => {
        let receiver = jest.fn();
        let not = new Not();
        not.connectToOutputPin(PIN_OUTPUT, receiver);

        not.sendToInputPin(PIN_INPUT, false);
        expect(receiver).toHaveBeenCalledWith(true);

        not.sendToInputPin(PIN_INPUT, true);
        expect(receiver).toHaveBeenCalledWith(false);

        not.sendToInputPin(PIN_INPUT, false);
        expect(receiver).toHaveBeenCalledWith(true);
    })
})
