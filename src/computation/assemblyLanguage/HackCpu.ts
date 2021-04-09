import { takeWhile } from 'lodash';
import { parseAsm } from './assemblyLanguage';
import {
    Registers,
    CpuInstruction,
    CpuInstructionType,
    DirectAddressInstruction,
    NamedAddressInstruction,
    ComputeInstruction,
    ComputeComputation,
    ComputeDestination,
    ComputeJump
} from './types';

const MEMORY_SIZE = Math.pow(2, 15);

class HackCpu {
    // Program
    program: CpuInstruction[];
    programCounter: number;

    // Memory and Registers
    memory: number[];
    dataRegister: number;
    addressRegister: number;

    namedRegisters: Registers;
    nextNamedRegisterAddress: number;

    constructor() {
        this.namedRegisters = {};
        this.dataRegister = 0;
        this.addressRegister = 0;
        this.programCounter = 0;
        this.memory = [];
        this.program = [];
        for (let x = 0; x < MEMORY_SIZE; x++) {
            this.memory.push(0);
        }
        this.reset();
    }

    setMemory(location: number, value: number) {
        if (location >= this.memory.length || location < 0) throw new Error('Invalid Memory Location')

        this.memory[location] = value;
    }

    getMemory(location: number) {
        if (location >= this.memory.length || location < 0) throw new Error('Invalid Memory Location')

        return this.memory[location];
    }

    reset() {
        this.programCounter = 0;
        this.dataRegister = 0;
        this.addressRegister = 0;
        for (let x = 0; x < MEMORY_SIZE; x++) {
            this.memory[x] = 0;
        }
        this.namedRegisters = {
            ...Array(16).map((_, i) => `R${i}`).reduce((acc, curr, i) => ({ ...acc, [curr]: i }), {}),
            'SCREEN': 0x4000,
            'KBD': 0x6000
        }
        this.nextNamedRegisterAddress = 16;
    }

    loadProgram(input: string) {
        this.program = [];
        const rawInstructions: CpuInstruction[] = input.split('\n')
            .map(s => s.trim())
            .map(s => parseAsm(s))
            .filter(l => l !== undefined);

        while(rawInstructions.length > 0) {
            const instruction = rawInstructions.shift();

            if (instruction.type === CpuInstructionType.label) {
                this.namedRegisters[instruction.label] = this.program.length;
            } else {
                this.program.push(instruction);
            }
        }        
    }

    tick() {
        // Just return if we have run off end of the memory
        if (this.programCounter >= this.program.length) return;

        this.executeInstruction(this.program[this.programCounter]);
    }

    executeInstruction(instruction: CpuInstruction) {
        switch (instruction.type) {
            case CpuInstructionType.directAddress:
                return this.goToDirectAddress(instruction);
            case CpuInstructionType.namedAddress:
                return this.goToNamedAddress(instruction);
            case CpuInstructionType.compute:
                return this.compute(instruction);
        }
    }

    goToDirectAddress({ address }: DirectAddressInstruction) {
        this.addressRegister = address;
        this.programCounter++;
    }

    goToNamedAddress({ registerName }: NamedAddressInstruction) {
        if (!(registerName in this.namedRegisters)) {
            this.namedRegisters[registerName] = this.nextNamedRegisterAddress;
            this.nextNamedRegisterAddress++;
        }
        this.programCounter++;
    }

    compute({ computation, destination, jump }: ComputeInstruction) {
        let result = 0;

        switch (computation) {
            case ComputeComputation.ZERO:
                result = 0;
                break;
            case ComputeComputation.ONE:
                result = 1;
                break;
            case ComputeComputation.NEGATIVE_ONE:
                result = -1;
                break;
            case ComputeComputation.D:
                result = this.dataRegister;
                break;
            case ComputeComputation.A:
                result = this.addressRegister;
                break;
            case ComputeComputation.NOT_D:
                result = ~this.dataRegister;
                break;
            case ComputeComputation.NOT_A:
                result = ~this.addressRegister;
                break;
            case ComputeComputation.NEGATIVE_D:
                result = -this.dataRegister;
                break;
            case ComputeComputation.NEGATIVE_A:
                result = -this.addressRegister;
                break;
            case ComputeComputation.D_PLUS_ONE:
                result = this.dataRegister + 1;
                break;
            case ComputeComputation.D_MINUS_ONE:
                result = this.dataRegister - 1;
                break;
            case ComputeComputation.A_PLUS_ONE:
                result = this.addressRegister + 1;
                break;
            case ComputeComputation.A_MINUS_ONE:
                result = this.addressRegister - 1;
                break;
            case ComputeComputation.D_PLUS_A:
                result = this.dataRegister + this.addressRegister;
                break;
            case ComputeComputation.D_MINUS_A:
                result = this.dataRegister - this.addressRegister;
                break;
            case ComputeComputation.A_MINUS_D:
                result = this.addressRegister - this.dataRegister;
                break;
            case ComputeComputation.D_AND_A:
                result = this.dataRegister & this.addressRegister;
                break;
            case ComputeComputation.D_OR_A:
                result = this.dataRegister | this.addressRegister;
                break;
            case ComputeComputation.M:
                result = this.memory[this.addressRegister];
                break;
            case ComputeComputation.NOT_M:
                result = ~this.memory[this.addressRegister];
                break;
            case ComputeComputation.M_PLUS_ONE:
                result = this.memory[this.addressRegister] + 1;
                break;
            case ComputeComputation.M_MINUS_D:
                result = this.memory[this.addressRegister] - 1;
                break;
            case ComputeComputation.D_PLUS_M:
                result = this.dataRegister + this.memory[this.addressRegister];
                break;
            case ComputeComputation.D_MINUS_M:
                result = this.dataRegister - this.memory[this.addressRegister];
                break;
            case ComputeComputation.M_MINUS_D:
                result = this.memory[this.addressRegister] - this.dataRegister;
                break;
            case ComputeComputation.D_AND_M:
                result = this.dataRegister & this.memory[this.addressRegister];
                break;
            case ComputeComputation.D_OR_M:
                result = this.dataRegister | this.memory[this.addressRegister];
                break;
        }

        switch (destination) {
            case ComputeDestination.M:
                this.memory[this.addressRegister] = result;
                break;
            case ComputeDestination.D:
                this.dataRegister = result;
                break;
            case ComputeDestination.MD:
                this.memory[this.addressRegister] = result;
                this.dataRegister = result;
                break;
            case ComputeDestination.A:
                this.addressRegister = result;
                break;
            case ComputeDestination.AM:
                this.addressRegister = result;
                this.memory[this.addressRegister] = result;
                break;
            case ComputeDestination.AD:
                this.addressRegister = result;
                this.dataRegister = result;
                break;
            case ComputeDestination.AMD:
                this.addressRegister = result;
                this.memory[this.addressRegister] = result;
                this.dataRegister = result;
                break;
        }

        let shouldJump = false;
        switch (jump) {
            case ComputeJump.JGT:
                shouldJump = result > 0;
                break;
            case ComputeJump.JEQ:
                shouldJump = result === 0;
                break;
            case ComputeJump.JGE:
                shouldJump = result >= 0;
                break;
            case ComputeJump.JLT:
                shouldJump = result < 0;
                break;
            case ComputeJump.JNE:
                shouldJump = result !== 0;
                break;
            case ComputeJump.JLE:
                shouldJump = result <= 0;
                break;
            case ComputeJump.JMP:
                shouldJump = true;
                break;
        }

        if (shouldJump) {
            this.programCounter = this.addressRegister;
        } else {
            this.programCounter++;
        }
    }
}

export default HackCpu;