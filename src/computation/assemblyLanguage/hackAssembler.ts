import {
    CpuInstruction,
    CpuInstructionType,
    ComputeComputation,
    ComputeDestination,
    ComputeJump,
    Registers
} from './types';
import { Optional } from "../../types";
import { escapeRegExp } from 'lodash';


const LABEL_REGEX = /\((?<label>[_A-Za-z0-9]+)\)/
const A_INSTRUCTION_DIRECT_REGEX = /^@(?<address>[0-9]+)\s*(?:\/\/(?<comment>.*)){0,1}$/
const A_INSTRUCTION_NAMED_REGEX = /^@(?<label>[_A-Za-z0-9]+)\s*(?:\/\/(?<comment>.*)){0,1}$/
const COMMENT_REGEX = /^(\s)*(\/\/|[\/*]|[*])/;

const createRegExpOptions = (o: object): string => Object.values(o).map(s => escapeRegExp(s)).join('|');
const DEST_OPTS = createRegExpOptions(ComputeDestination);
const COMP_OPTS = createRegExpOptions(ComputeComputation);
const JUMP_OPTS = createRegExpOptions(ComputeJump);

const C_INSTRUCTION_REGEX = new RegExp(`^(?:(?:(?<destination>${DEST_OPTS})=)|=){0,1}(?<computation>${COMP_OPTS})(?:;(?<jump>${JUMP_OPTS})){0,1}\\s*(?:\/\/(?<comment>.*)){0,1}$`)

export const toSymbolicAsm = (input: CpuInstruction, registers: Registers = {}): string => {
    switch (input.type) {
        case CpuInstructionType.directAddress:
            return `@${input.address}`
        case CpuInstructionType.namedAddress:
            return `@${input.registerName in registers ? registers[input.registerName] : input.registerName}`
        case CpuInstructionType.label:
            return `(${input.label})`;
        case CpuInstructionType.compute:
            return `${input.destination ? `${input.destination}=` : ``}${input.computation}${input.jump ? `;${input.jump}` : ''}`
    }

}

export const parseSymbolicAsm = (input: string): Optional<CpuInstruction> => {
    // Blank lines...
    if (input.trim().length === 0) return;

    // Is this a comment?
    const isComment = input.match(COMMENT_REGEX);
    if (isComment) return;

    // Is this a label?
    const label = input.match(LABEL_REGEX);
    if (label !== null) {
        return {
            type: CpuInstructionType.label,
            label: label.groups.label,
        }
    }

    // Is this an address instruction with direct value?
    const aDirect = input.match(A_INSTRUCTION_DIRECT_REGEX);
    if (aDirect !== null) {
        return {
            type: CpuInstructionType.directAddress,
            address: parseInt(aDirect.groups.address, 10),
            comment: aDirect.groups.comment
        }
    }

    // Is this an address instruction with named value?
    const aNamed = input.match(A_INSTRUCTION_NAMED_REGEX);
    if (aNamed !== null) {
        return {
            type: CpuInstructionType.namedAddress,
            registerName: aNamed.groups.label,
            comment: aNamed.groups.comment
        }
    }

    // Is this a computation?
    const compute = input.match(C_INSTRUCTION_REGEX);
    if (compute !== null) {
        return {
            type: CpuInstructionType.compute,
            destination: compute.groups.destination as ComputeDestination,
            computation: compute.groups.computation as ComputeComputation,
            jump: compute.groups.jump as ComputeJump,
            comment: compute.groups.comment
        }
    }

    throw new Error(`Invalid Hack ASM Line: ${input}`)
}