import Not from '.';
import { PIN_INPUT, PIN_OUTPUT } from '../../types';

describe('NOT', () => {
    test('Simple', () => {
        const receiver = jest.fn();
        const not = new Not();
        not.connectToOutputPin(PIN_OUTPUT, receiver);

        not.sendToInputPin(PIN_INPUT, false);
        expect(receiver).toHaveBeenLastCalledWith(true);

        not.sendToInputPin(PIN_INPUT, true);
        expect(receiver).toHaveBeenLastCalledWith(false);

        not.sendToInputPin(PIN_INPUT, false);
        expect(receiver).toHaveBeenLastCalledWith(true);
    })
})
