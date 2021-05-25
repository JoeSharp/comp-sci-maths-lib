import { readFileSync } from 'fs';
import Clock from '../../Clock';
import { parseHdlFile } from '../../HDL/hdl'
import HDLChip from '../../HDL/HDLChip';
import BinaryPin from '../../BinaryPin';

import { PIN_A, PIN_B, PIN_OUTPUT, TwoInOneOutTestCase } from "../../types";

import Or from "./Or";

const OR_TEST_CASES: TwoInOneOutTestCase[] = [
  {
    a: false,
    b: false,
    expected: false,
  },
  {
    a: false,
    b: true,
    expected: true,
  },
  {
    a: true,
    b: false,
    expected: true,
  },
  {
    a: true,
    b: true,
    expected: true,
  },
];
describe("OR", () => {
  const orReceiver = new BinaryPin();
  const or = new Or();
  or.getPin(PIN_OUTPUT).connect(orReceiver);

  const data = readFileSync('src/computation/nand/NandTestScript/testData/01/Or.hdl', 'utf8');
  const hdlFile = parseHdlFile(data);
  const clock = new Clock();
  const hdlChip = new HDLChip(hdlFile, clock);
  const hdlChipReceiver = new BinaryPin();
  hdlChip.getPin(PIN_OUTPUT).connect(hdlChipReceiver);

  OR_TEST_CASES.forEach(({ a, b, expected }) => {
    [
      { testName: 'nand', chip: or, receiver: orReceiver },
      { testName: 'hdl', chip: hdlChip, receiver: hdlChipReceiver }
    ].forEach(({ testName, chip, receiver }) => {
      test(`${a} OR ${b} = ${expected} ${testName}`, () => {
        chip.getPin(PIN_A).send(a);
        chip.getPin(PIN_B).send(b);
        expect(receiver.lastOutput).toBe(expected);
      });
    })

  });
});

