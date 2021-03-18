const fs = require('fs');
const csv = require('csvtojson');

const csvFilePath = 'csv/nodejs-hw1-ex1.csv';

csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        console.log(jsonObj);
        fs.writeFileSync('output.txt', JSON.stringify(jsonObj), (error) => {
            console.log('There is an error!' + error);
        });
    })
