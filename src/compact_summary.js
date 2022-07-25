// reformat a yml test file to make it a little more human readable
const yaml = require('js-yaml');
const fs = require('fs');
const testFile = yaml.load(fs.readFileSync('Medicare_Male.yml'));
// console.log(testFile);
// console.log(testFile[0].resourceType);
const conditions = testFile.filter(resource => resource.resourceType=='Condition');
console.log(conditions);


