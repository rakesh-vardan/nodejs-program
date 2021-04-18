import { createInterface } from 'readline';
import { red, green } from 'chalk';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

const reverseGivenInput = () => {
    rl.question('Enter Input: \n', (input) => {
        if (input === 'exit') {
            console.log(red.inverse('Exiting the program!'));
            return rl.close();
        }
        else {
            const output = input.split("").reverse().join("");
            console.log(`Output is: \n${green.inverse(output)}`);
            reverseGivenInput();
        }
    });
}

reverseGivenInput();
