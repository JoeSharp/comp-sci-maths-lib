import { AsmMemLine } from "./types"

export const parseMemoryLine = (input: string): AsmMemLine => {

    return {
        location: input.length
    }
}