import { Clock } from "../../Clocked";
import { generateRandomWord, PIN_INPUT, PIN_LOAD, PIN_OUTPUT, WORD_LENGTH } from "../../types";
import Register from "./Register";

describe('Register', () => {
    test('Simple', () => {
        const clock = new Clock();
        const register = new Register(clock);
        const receivers = Array(WORD_LENGTH).fill(null).map(() => jest.fn());
        register.connectToOutputBus(PIN_OUTPUT, receivers);

        let lastWord: boolean[] = [];
        for (let x = 0; x < 10; x++) {
            const word = generateRandomWord();
            register.sendToInputBus(PIN_INPUT, word);

            if (lastWord.length === word.length) {
                register.sendToInputPin(PIN_LOAD, false);
                clock.ticktock();
                receivers.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(lastWord[i]));
            }

            register.sendToInputPin(PIN_LOAD, true);
            clock.ticktock();
            receivers.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(word[i]));
            lastWord = word;
        }
    })
})