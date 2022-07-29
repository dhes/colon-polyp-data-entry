// read in all yaml files from a directory
const yaml = require('js-yaml');
const fs = require('fs');
var yamlFiles = fs.readdirSync('./src/data').filter(fn => fn.endsWith('polyps.yml'))
console.log(yamlFiles);