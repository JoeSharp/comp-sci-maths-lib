import { generateRandomWord, PIN_INPUT, PIN_OUTPUT, WORD_LENGTH } from "./types";
import SingleInOut from './Test/SingleInOut';
import SimpleBusInOut from "./Test/SimpleBusInOut";
import { BUS_OUTPUT_1, BUS_OUTPUT_2 } from "./Test/BusFork";

describe("Chip", () => {
    test('Simple Pin Connection', () => {
        const chip = new SingleInOut();
        const receiver = jest.fn();
        chip.connectToOutputPin(PIN_OUTPUT, receiver);

        chip.sendToInputPin(PIN_INPUT, false);
        expect(receiver).toHaveBeenLastCalledWith(false);
        chip.sendToInputPin(PIN_INPUT, true);
        expect(receiver).toHaveBeenLastCalledWith(true);
        chip.sendToInputPin(PIN_INPUT, false);
        expect(receiver).toHaveBeenLastCalledWith(false);
    });

    test('Simple Bus Connection', () => {
        const chip = new SimpleBusInOut();
        const receivers = Array(WORD_LENGTH).fill(null).map(() => jest.fn());
        const word1 = generateRandomWord();
        const word2 = generateRandomWord();
        const word3 = generateRandomWord();
        chip.connectToOutputBus(PIN_OUTPUT, receivers);

        chip.sendToInputBus(PIN_INPUT, word1);
        receivers.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(word1[i]));
        chip.sendToInputBus(PIN_INPUT, word2);
        receivers.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(word2[i]));
        chip.sendToInputBus(PIN_INPUT, word3);
        receivers.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(word3[i]));
    });

    test('Bus Fork', () => {
        const chip = new SimpleBusInOut();
        const receivers1 = Array(WORD_LENGTH).fill(null).map(() => jest.fn());
        const receivers2 = Array(WORD_LENGTH).fill(null).map(() => jest.fn());
        const word1 = generateRandomWord();
        const word2 = generateRandomWord();
        const word3 = generateRandomWord();
        chip.connectToOutputBus(BUS_OUTPUT_1, receivers1);
        chip.connectToOutputBus(BUS_OUTPUT_2, receivers2);

        chip.sendToInputBus(PIN_INPUT, word1);
        [receivers1, receivers1].forEach(rs => rs.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(word1[i])));
        chip.sendToInputBus(PIN_INPUT, word2);
        [receivers1, receivers1].forEach(rs => rs.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(word2[i])));
        chip.sendToInputBus(PIN_INPUT, word3);
        [receivers1, receivers1].forEach(rs => rs.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(word3[i])));
    });
})