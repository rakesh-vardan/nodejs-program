import { createReadStream, createWriteStream } from 'fs';
import csv from 'csvtojson';

const CSV_FILE_PATH = 'csv/nodejs-hw1-ex1.csv';
const OUTPUT_FILE_NAME = 'output.txt';

const readStream = createReadStream(CSV_FILE_PATH).setEncoding('utf-8');
const writeStream = createWriteStream(OUTPUT_FILE_NAME);
readStream.pipe(csv()).pipe(writeStream);
