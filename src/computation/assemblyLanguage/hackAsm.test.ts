import { parseSymbolicAsm } from "./hackAsm";
import {
  ComputeComputation,
  ComputeDestination,
  ComputeInstruction,
  ComputeJump,
  CpuInstructionType,
  CpuDirectAddressInstruction,
  CpuNamedAddressInstruction,
} from "./types";

interface TestCase {
  symbolic: string;
  expected: ComputeInstruction;
}

const TEST_CASES: TestCase[] = [
  {
    symbolic: "A=D",
    expected: {
      type: CpuInstructionType.compute,
      destination: ComputeDestination.A,
      computation: ComputeComputation.D,
    },
  },
  {
    symbolic: "A=D-1",
    expected: {
      type: CpuInstructionType.compute,
      destination: ComputeDestination.A,
      computation: ComputeComputation.D_MINUS_ONE,
    },
  },
  {
    symbolic: "=D;JMP",
    expected: {
      type: CpuInstructionType.compute,
      computation: ComputeComputation.D,
      jump: ComputeJump.JMP,
    },
  },
  {
    symbolic: "M=D+A;JLT",
    expected: {
      type: CpuInstructionType.compute,
      destination: ComputeDestination.M,
      computation: ComputeComputation.D_PLUS_A,
      jump: ComputeJump.JLT,
    },
  },
  {
    symbolic: "D=M              // D = first number",
    expected: {
      type: CpuInstructionType.compute,
      destination: ComputeDestination.D,
      computation: ComputeComputation.M,
      comment: " D = first number",
    },
  },
];

describe("Hack CPU", () => {
  test("Address Instruction - Direct (Single)", () => {
    const res = parseSymbolicAsm(`@78`);
    expect(res.type).toBe(CpuInstructionType.directAddress);
    const { address } = res as CpuDirectAddressInstruction;
    expect(address).toBe(78);
  });

  test("Address Instruction - Direct (Array)", () => {
    [56, 128, 9000].forEach((testAddress) => {
      const res1 = parseSymbolicAsm(`@${testAddress}`);
      expect(res1.type).toBe(CpuInstructionType.directAddress);
      const { address } = res1 as CpuDirectAddressInstruction;
      expect(address).toBe(testAddress);
    });
  });

  test("Address Instruction - Named Register (Single)", () => {
    const res = parseSymbolicAsm(`@KBD`);
    expect(res.type).toBe(CpuInstructionType.namedAddress);
    const { registerName } = res as CpuNamedAddressInstruction;
    expect(registerName).toBe("KBD");
  });

  test("Address Instruction - Named Register (Array)", () => {
    ["R1", "SCREEN", "myVariable"].forEach((testRegisterName) => {
      const res = parseSymbolicAsm(`@${testRegisterName}`);
      expect(res.type).toBe(CpuInstructionType.namedAddress);
      const { registerName } = res as CpuNamedAddressInstruction;
      expect(registerName).toBe(testRegisterName);
    });
  });

  TEST_CASES.forEach(({ symbolic, expected }) => {
    test(`Compute Instruction ${symbolic}`, () => {
      const instruction = parseSymbolicAsm(symbolic);
      expect(instruction.type).toBe(CpuInstructionType.compute);
      const {
        computation,
        jump,
        destination,
        comment,
      } = instruction as ComputeInstruction;
      expect(destination).toBe(expected.destination);
      expect(computation).toBe(expected.computation);
      expect(jump).toBe(expected.jump);
      expect(comment).toBe(expected.comment);
    });
  });
});
