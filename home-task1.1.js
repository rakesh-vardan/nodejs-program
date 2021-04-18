const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const reverseGivenInput = () => {
    rl.question('Enter Input: \n', (input) => {
        if (input === 'exit') {
            console.log(chalk.red.inverse('Exiting the program!'));
            return rl.close();
        }
        else {
            const output = input.split("").reverse().join("");
            console.log(`Output is: \n${chalk.green.inverse(output)}`);
            reverseGivenInput();
        }
    });
}

reverseGivenInput();
