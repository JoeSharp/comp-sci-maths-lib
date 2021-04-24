import { Clock } from "../../Clocked";
import { generateRandomWord, PIN_ADDRESS, PIN_INPUT, PIN_LOAD, PIN_OUTPUT, WORD_LENGTH } from "../../types";
import RAM8 from "./RAM8"

interface TestData {
    address: boolean[];
    content: boolean[];
}

describe('RAM8', () => {
    test('Simple', () => {
        const receivers = Array(WORD_LENGTH).fill(null).map(() => jest.fn());
        const clock = new Clock();
        const ram = new RAM8(clock);
        ram.connectToOutputBus(PIN_OUTPUT, receivers);
        const testData = [
            {
                address: [false, false, true],
                content: generateRandomWord()
            },
            {
                address: [false, true, true],
                content: generateRandomWord()
            },
            {
                address: [true, false, true],
                content: generateRandomWord()
            }
        ]

        ram.sendToInputPin(PIN_LOAD, true);
        ram.sendToInputBus(PIN_INPUT, testData[0].content)
        ram.sendToInputBus(PIN_ADDRESS, testData[0].address);
        clock.ticktock();
        receivers.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(testData[0].content[i]));

        ram.sendToInputBus(PIN_INPUT, testData[1].content)
        ram.sendToInputBus(PIN_ADDRESS, testData[1].address);
        clock.ticktock();
        receivers.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(testData[1].content[i]));

        ram.sendToInputBus(PIN_INPUT, testData[2].content)
        ram.sendToInputBus(PIN_ADDRESS, testData[2].address);
        clock.ticktock();
        receivers.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(testData[2].content[i]));

        // Back to word1
        ram.sendToInputPin(PIN_LOAD, false);
        ram.sendToInputBus(PIN_ADDRESS, testData[0].address);
        clock.ticktock();
        receivers.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(testData[0].content[i]));
    })
})