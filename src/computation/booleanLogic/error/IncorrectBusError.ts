export default class IncorrectBusError extends Error {
    chipName: string;
    busNames: string[];
    constructor(chipName: string, busNames: string[]) {
        super(`Busses Incorrect for ${chipName} - ${busNames}`)
        this.chipName = chipName;
        this.busNames = busNames;
    }
}
