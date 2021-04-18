const fs = require('fs');
const csv = require('csvtojson');

const CSV_FILE_PATH = 'csv/nodejs-hw1-ex1.csv';
const OUTPUT_FILE_NAME = 'output.txt';

const readStream = fs.createReadStream(CSV_FILE_PATH).setEncoding('utf-8');
const writeStream = fs.createWriteStream(OUTPUT_FILE_NAME);
readStream.pipe(csv()).pipe(writeStream);
