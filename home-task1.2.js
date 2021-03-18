const fs = require('fs');
const csv = require('csvtojson');

const CSV_FILE_PATH = 'csv/nodejs-hw1-ex1.csv';
const OUTPUT_FILE_NAME = 'output.txt';

csv()
    .fromFile(CSV_FILE_PATH)
    .then((csvDataArray) => {
        csvDataArray.forEach(element => {
            const updatedElement = convertKeysToLowerCase(element);
            writeToTextFile(updatedElement);
        });
    })

const convertKeysToLowerCase = (element) => Object.fromEntries(
    Object.entries(element).map(([k, v]) => [k.toLowerCase(), v])
);

const writeToTextFile = (element) => {
    fs.appendFileSync(OUTPUT_FILE_NAME, JSON.stringify(element) + "\r\n", (error) => {
        if (error) {
            console.log('An error occured while writing the JSON object to file!');
            return console.log(error);
        }
    });
}

