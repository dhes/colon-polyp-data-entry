const yaml = require('js-yaml');
const fs = require('fs');
var yamlFiles = fs.readdirSync('./src/data').filter(fn => fn.endsWith('.yml'))
console.log(yamlFiles);