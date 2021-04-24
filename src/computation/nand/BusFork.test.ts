import { generateRandomWord, WORD_LENGTH } from "./types";
import BusFork from "./BusFork";
import { BUS_OUTPUT_1, BUS_OUTPUT_2 } from "./BusFork";

describe('Bus Fork', () => {
    test('One in, Two Out', () => {

        const receivers1 = Array(WORD_LENGTH).fill(null).map(() => jest.fn());
        const receivers2 = Array(WORD_LENGTH).fill(null).map(() => jest.fn());
        const word1 = generateRandomWord();
        const word2 = generateRandomWord();
        const word3 = generateRandomWord();
        const chip = new BusFork()
            .withOutput(receivers1)
            .withOutput(receivers2);

        chip.send(word1);
        [receivers1, receivers2].forEach(rs => rs.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(word1[i])));
        chip.send(word2);
        [receivers1, receivers2].forEach(rs => rs.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(word2[i])));
        chip.send(word3);
        [receivers1, receivers2].forEach(rs => rs.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(word3[i])));
    });
})