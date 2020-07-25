import * as winston from "winston";

export const simpleLogger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

// tslint:disable-next-line: no-empty
export const EMPTY_OBSERVER = () => {};
