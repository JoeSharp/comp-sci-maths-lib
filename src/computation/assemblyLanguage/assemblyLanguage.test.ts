import { parseMemoryLine } from "./assemblyLanguage";

describe('Assembly Language (Hack ASM)', () => {
    test('Detect Memory Line', () => {
        const res = parseMemoryLine('foo');
        expect(res.location).toBe(3);
    });
});