import Splitter from './Splitter';

describe('NAND - Splitter', () => {

    test('Boolean', () => {
        let receiver1 = jest.fn();
        let receiver2 = jest.fn();
        let splitter: Splitter<boolean> = new Splitter();
        splitter.connectOutput(receiver1);
        splitter.connectOutput(receiver2);

        splitter.send(true);
        expect(receiver1).toHaveBeenLastCalledWith(true);
        expect(receiver2).toHaveBeenLastCalledWith(true);

        splitter.send(false);
        expect(receiver1).toHaveBeenLastCalledWith(false);
        expect(receiver2).toHaveBeenLastCalledWith(false);
    });

    test('Number', () => {
        let receiver1 = jest.fn();
        let receiver2 = jest.fn();
        let splitter: Splitter<number> = new Splitter();
        splitter.connectOutput(receiver1);
        splitter.connectOutput(receiver2);

        splitter.send(56);
        expect(receiver1).toHaveBeenLastCalledWith(56);
        expect(receiver2).toHaveBeenLastCalledWith(56);

        splitter.send(-905);
        expect(receiver1).toHaveBeenLastCalledWith(-905);
        expect(receiver2).toHaveBeenLastCalledWith(-905);
    })
})