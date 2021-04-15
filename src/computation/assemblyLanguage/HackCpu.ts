import { parseSymbolicAsm } from "./hackAsm";
import {
  Registers,
  CpuInstruction,
  CpuInstructionType,
  CpuDirectAddressInstruction,
  CpuNamedAddressInstruction,
  ComputeInstruction,
  ComputeComputation,
  ComputeDestination,
  ComputeJump,
  ALUState,
} from "./types";

export const VARIABLE_START = 0x10;
export const SCREEN = 0x4000;
export const KBD = 0x6000;

const MEMORY_SIZE = Math.pow(2, 15);

const EMPTY_ALU: ALUState = {
  lastComputation: ComputeComputation.ZERO,
  lastResult: 0,
  aRegister: 0,
  dRegister: 0,
  mContents: 0,
};

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

  // ALU
  alu: ALUState;

  constructor() {
    this.namedRegisters = {};
    this.dataRegister = 0;
    this.addressRegister = 0;
    this.programCounter = 0;
    this.memory = [];
    this.program = [];
    this.alu = { ...EMPTY_ALU };
    for (let x = 0; x < MEMORY_SIZE; x++) {
      this.memory.push(0);
    }
    this.reset();
  }

  toString(firstMemBytes: number = 100) {
    return `D: ${this.dataRegister}
A: ${this.addressRegister},
PC: ${this.programCounter},
Named Registers:
${Object.entries(this.namedRegisters)
  .map(([key, value]) => `\t${key}=${value.toString(10)}`)
  .join("\n")}
Program:
${this.program.map((s, i) => `\t${i} - ${JSON.stringify(s)}`).join("\n")}
Memory:
${this.memory
  .filter((_, i) => i < firstMemBytes)
  .map((x, i) => `\t${i.toString(10)}: ${x.toString(10)}`)
  .join("\n")}
`;
  }

  setPC(value: number) {
    this.programCounter = value;
  }

  setA(value: number) {
    this.addressRegister = value;
  }

  setD(value: number) {
    this.dataRegister = value;
  }

  setMemory(startAddress: number, values: number[]) {
    if (startAddress + values.length > this.memory.length || startAddress < 0)
      throw new Error("Invalid Memory Location");

    values.forEach((value, i) => (this.memory[startAddress + i] = value));
  }

  getMemory(location: number) {
    if (location >= this.memory.length || location < 0)
      throw new Error("Invalid Memory Location");

    return this.memory[location];
  }

  reset() {
    this.programCounter = 0;
    this.dataRegister = 0;
    this.addressRegister = 0;
    this.alu = { ...EMPTY_ALU };
    for (let x = 0; x < MEMORY_SIZE; x++) {
      this.memory[x] = 0;
    }
    this.namedRegisters = {
      ...Array(16)
        .fill(null)
        .map((_, i) => `R${i}`)
        .reduce((acc, curr, i) => ({ ...acc, [curr]: i }), {}),
      SCREEN,
      KBD,
    };
    this.nextNamedRegisterAddress = 16;
  }

  loadProgram(input: string) {
    const rawInstructions: CpuInstruction[] = input
      .split("\n")
      .map((s) => s.trim())
      .map((s, i) => parseSymbolicAsm(s, i))
      .filter((l) => l !== undefined);

    this.program = [];
    while (rawInstructions.length > 0) {
      const instruction = rawInstructions.shift();

      if (instruction.type === CpuInstructionType.label) {
        this.namedRegisters[instruction.label] = this.program.length;
      } else {
        this.program.push(instruction);
      }
    }

    let nextVariable = VARIABLE_START;

    // Replace any named register jumps with specific jumps
    this.program = this.program.map((p) => {
      if (p.type === CpuInstructionType.namedAddress) {
        if (p.registerName in this.namedRegisters) {
          return {
            type: CpuInstructionType.directAddress,
            originalLineNumber: p.originalLineNumber,
            address: this.namedRegisters[p.registerName],
            comment: p.comment,
          };
        } else {
          // Create new variable from 16 onwards
          this.namedRegisters[p.registerName] = nextVariable;
          nextVariable++;
          return {
            type: CpuInstructionType.directAddress,
            originalLineNumber: p.originalLineNumber,
            address: this.namedRegisters[p.registerName],
            comment: p.comment,
          };
        }
      }

      return p;
    });
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

  goToDirectAddress({ address }: CpuDirectAddressInstruction) {
    this.addressRegister = address;
    this.programCounter++;
  }

  goToNamedAddress({ registerName }: CpuNamedAddressInstruction) {
    if (!(registerName in this.namedRegisters)) {
      this.namedRegisters[registerName] = this.nextNamedRegisterAddress;
      this.nextNamedRegisterAddress++;
    }
    this.addressRegister = this.namedRegisters[registerName];
    this.programCounter++;
  }
  /* tslint:disable:no-bitwise */
  compute({ computation, destination, jump }: ComputeInstruction) {
    let result = 0;

    this.alu.lastComputation = computation;
    this.alu.aRegister = this.addressRegister;
    this.alu.dRegister = this.dataRegister;
    this.alu.mContents = this.memory[this.addressRegister];

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
      case ComputeComputation.M_MINUS_ONE:
        result = this.memory[this.addressRegister] - 1;
        break;
      case ComputeComputation.D_PLUS_M:
        result = this.dataRegister + this.memory[this.addressRegister];
        break;
      case ComputeComputation.D_MINUS_M:
        result = this.dataRegister - this.memory[this.addressRegister];
        break;
      case ComputeComputation.M_MINUS_D:
        result = this.memory[this.addressRegister] - 1;
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

    this.alu.lastResult = result;

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
  /* tslint:enable:no-bitwise */
}

export default HackCpu;
