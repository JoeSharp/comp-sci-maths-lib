import { binary, denary, hexadecimal } from './NumberBase';

interface TestCase {
    value: number;
    asBinary: string;
    asDenary: string;
    asHexadecimal: string;
}

const testCases: TestCase[] = [
    {
        value: 1,
        asBinary: '00000001',
        asDenary: '1',
        asHexadecimal: '01'
    },
    {
        value: 4,
        asBinary: '00000100',
        asDenary: '4',
        asHexadecimal: '04'
    },
    {
        value: 9,
        asBinary: '00001001',
        asDenary: '9',
        asHexadecimal: '09'
    },
    {
        value: 12,
        asBinary: '00001100',
        asDenary: '12',
        asHexadecimal: '0C'
    },
    {
        value: 14,
        asBinary: '00001110',
        asDenary: '14',
        asHexadecimal: '0E'
    },
    {
        value: 23,
        asBinary: '00010111',
        asDenary: '23',
        asHexadecimal: '17'
    },
    {
        value: 34,
        asBinary: '00100010',
        asDenary: '34',
        asHexadecimal: '22'
    },
    {
        value: 129,
        asBinary: '10000001',
        asDenary: '129',
        asHexadecimal: '81'
    },
    {
        value: 167,
        asBinary: '10100111',
        asDenary: '167',
        asHexadecimal: 'A7'
    },
    {
        value: 230,
        asBinary: '11100110',
        asDenary: '230',
        asHexadecimal: 'E6'
    }
]

testCases.forEach(({ value, asBinary, asDenary, asHexadecimal }) => {
    test(`Number Bases - Binary of ${value} should be ${asBinary}`, () => {
        expect(binary.toString(value)).toEqual(asBinary);
        expect(binary.fromString(asBinary)).toBe(value);
    });
    test(`Number Bases - Denary of ${value} should be ${asDenary}`, () => {
        expect(denary.toString(value)).toEqual(asDenary);
        expect(denary.fromString(asDenary)).toBe(value);
    });
    test(`Number Bases - Hex of ${value} should be 0x${asHexadecimal}`, () => {
        expect(hexadecimal.toString(value)).toEqual(asHexadecimal);
        expect(hexadecimal.fromString(asHexadecimal)).toBe(value);
    });
});

