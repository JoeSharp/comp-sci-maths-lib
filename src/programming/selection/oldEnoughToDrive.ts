import readline from 'readline'
import { simpleLogger } from '../../common'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What is your name ? ", (name) => {
    rl.question("Where do you live ? ", (country) => {
        simpleLogger.info(`${name}, is a citizen of ${country}`);
        rl.close();
    });
});

rl.on("close", () => {
    simpleLogger.info("\nBYE BYE !!!");
    process.exit(0);
});