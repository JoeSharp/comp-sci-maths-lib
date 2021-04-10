export default class MissingInputError extends Error {
    chipName: string;
    inputNames: string[];
    constructor(chipName: string, inputNames: string[]) {
        super(`Missing Inputs for ${chipName} - ${inputNames}`)
        this.inputNames = inputNames;
    }
}