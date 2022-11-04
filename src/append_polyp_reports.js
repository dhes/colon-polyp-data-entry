const yaml = require('js-yaml');
const fs = require('fs');
const { compactFile2TestFile } = require("./compact_file_2_test_file");
// collect yaml polyp file in a directory into one
// expand them in to test files
// merge the test files into a single report
// add a patient summary
// run it as a test file
// convert it to json
// upload it to a FHIR server
// ...
// read in all yaml files from a directory
const polypFileNames = fs.readdirSync('./src/data').filter(fn => fn.endsWith('polyps.yml'))
// console.log(polypFileNames);
const sum = polypFileNames.reduce((total, amount) => {
    total.push(compactFile2TestFile('src/data/' + amount));
    return total;
}, []);
fs.writeFileSync('allPolypFiles.yml', sum, 'utf8');
// fs.readFileSync(polypfile, 'utf8')
// get the synthetic patient files
// const base = yaml.load(fs.readFileSync('src/data/Medicare_Male.yml', 'utf8'));
// this polyp report appended to a patient file
// report is what is created by main.js
// const fullReport = [...base, ...report];
//const allPolypsFiles = 
// fs.writeFileSync('full_report.yml', yaml.dump(fullReport, { noRefs: true }));
