import BinaryPin from "./BinaryPin";

describe("NAND - Splitter", () => {
  test("Boolean", () => {
    const receiver1 = new BinaryPin();
    const receiver2 = new BinaryPin();
    const splitter: BinaryPin = new BinaryPin();
    splitter.connectOutput(receiver1);
    splitter.connectOutput(receiver2);

    splitter.send(true);
    expect(receiver1.lastOutput).toBe(true);
    expect(receiver2.lastOutput).toBe(true);

    splitter.send(false);
    expect(receiver1.lastOutput).toBe(false);
    expect(receiver2.lastOutput).toBe(false);
  });
});
