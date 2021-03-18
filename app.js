const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const reverseGivenInput = () => {
    rl.question('Enter Input: \n', (input) => {
        if (input === 'exit') return rl.close();
        else {
            const output = input.split("").reverse().join("");
            console.log(`Output is: \n${output}`);
            reverseGivenInput();
        }
    });
}

reverseGivenInput();
