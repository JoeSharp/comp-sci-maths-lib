import Not from './Not';

describe('NOT', () => {
    test('Simple', () => {
        let receiver = jest.fn();
        let not = new Not();
        not.connectOutput(receiver);

        not.sendIn(false);
        expect(receiver).toHaveBeenCalledWith(true);

        not.sendIn(true);
        expect(receiver).toHaveBeenCalledWith(false);

        not.sendIn(false);
        expect(receiver).toHaveBeenCalledWith(true);
    })
})
