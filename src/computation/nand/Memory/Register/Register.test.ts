import { Clock } from "../../Clocked";
import { generateRandomWord, PIN_INPUT, PIN_LOAD, PIN_OUTPUT, WORD_LENGTH } from "../../types";
import Register from "./Register";

describe('Register', () => {
    test('Simple', () => {
        const clock = new Clock();
        const register = new Register(clock);
        const receivers = Array(WORD_LENGTH).fill(null).map(() => jest.fn());
        const word1 = generateRandomWord();
        const word2 = generateRandomWord();
        register.connectToOutputBus(PIN_OUTPUT, receivers);

        register.sendToInputBus(PIN_INPUT, word1);
        register.sendToInputPin(PIN_LOAD, true);
        clock.ticktock();
        receivers.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(word1[i]));

        register.sendToInputBus(PIN_INPUT, word2);
        receivers.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(word1[i]));
        clock.ticktock();
        receivers.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(word2[i]));
    })
})