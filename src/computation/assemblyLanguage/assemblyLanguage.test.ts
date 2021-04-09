import { readFileSync } from "fs";
import { parseAsm } from "./assemblyLanguage";
import HackCpu from "./HackCpu";
import { ComputeComputation, ComputeDestination, ComputeInstruction, ComputeJump, CpuInstructionType, DirectAddressInstruction, NamedAddressInstruction } from "./types";

interface TestCase {
    symbolic: string;
    expected: ComputeInstruction;
}

const TEST_CASES: TestCase[] = [
    {
        symbolic: 'A=D',
        expected: {
            type: CpuInstructionType.compute,
            destination:ComputeDestination.A,
            computation: ComputeComputation.D,
        }
    },
    {
        symbolic: 'A=D-1',
        expected: {
            type: CpuInstructionType.compute,
            destination:ComputeDestination.A,
            computation: ComputeComputation.D_MINUS_ONE,
        }
    },
    {
        symbolic: '=D;JMP',
        expected: {
            type: CpuInstructionType.compute,
            computation: ComputeComputation.D,
            jump: ComputeJump.JMP
        }
    },
    {
        symbolic: 'M=D+A;JLT',
        expected: {
            type: CpuInstructionType.compute,
            destination: ComputeDestination.M,
            computation: ComputeComputation.D_PLUS_A,
            jump: ComputeJump.JLT
        }
    },
    {
        symbolic: 'D=M              // D = first number',
        expected: {
            type: CpuInstructionType.compute,
            destination: ComputeDestination.D,
            computation: ComputeComputation.M,
            comment: ' D = first number'
        }
    }
]

describe('Assembly Language (Hack ASM)', () => {
    test('Address Instruction - Direct (Single)', () => {
        const res = parseAsm(`@78`);
        expect(res.type).toBe(CpuInstructionType.directAddress);
        const { address } = res as DirectAddressInstruction;
        expect(address).toBe(78);

    });

    test('Address Instruction - Direct (Array)', () => {
        [56, 128, 9000].forEach(testAddress => {
            const res1 = parseAsm(`@${testAddress}`);
            expect(res1.type).toBe(CpuInstructionType.directAddress);
            const { address } = res1 as DirectAddressInstruction;
            expect(address).toBe(testAddress);

        });
    })

    test('Address Instruction - Named Register (Single)', () => {
        const res = parseAsm(`@KBD`);
        expect(res.type).toBe(CpuInstructionType.namedAddress);
        const { registerName } = res as NamedAddressInstruction;
        expect(registerName).toBe('KBD');
    });

    test('Address Instruction - Named Register (Array)', () => {
        ["R1", "SCREEN", "myVariable"].forEach(testRegisterName => {
            const res = parseAsm(`@${testRegisterName}`);
            expect(res.type).toBe(CpuInstructionType.namedAddress);
            const { registerName } = res as NamedAddressInstruction;
            expect(registerName).toBe(testRegisterName);
        });
    });

    TEST_CASES.forEach(({symbolic, expected}) => {
        test(`Compute Instruction ${symbolic}`, () => {
            const instruction = parseAsm(symbolic);
            expect(instruction.type).toBe(CpuInstructionType.compute);
            const {computation, jump, destination, comment} = instruction as ComputeInstruction;
            expect(destination).toBe(expected.destination);
            expect(computation).toBe(expected.computation);
            expect(jump).toBe(expected.jump);
            expect(comment).toBe(expected.comment);
        })

    });

    test('ASM Code File (Add)', () => {
        const data = readFileSync('src/computation/assemblyLanguage/testData/Add.asm', 'utf8');

        const cpu = new HackCpu();
        cpu.loadProgram(data);

        for (let x=0; x<10; x++) {
            cpu.tick();
        }

        expect(cpu.getMemory(0)).toBe(5);
    })

    test('ASM Code File (Max)', () => {
        const data = readFileSync('src/computation/assemblyLanguage/testData/Max.asm', 'utf8');

        const cpu = new HackCpu();
        cpu.loadProgram(data);
        cpu.setMemory(0, 56);
        cpu.setMemory(0, 73);

        for (let x=0; x<26; x++) {
            cpu.tick();
        }

        expect(cpu.getMemory(2)).toBe(73);
    })
});