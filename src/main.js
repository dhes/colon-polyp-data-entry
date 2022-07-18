const yaml = require('js-yaml');
const fs = require('fs');
// const { Z_FIXED } = require('zlib');
a = {
    "resourceType": "Procedure",
    "id": "96582371-740e-4fbf-9a7b-7a1450472b76",
    "performedDateTime": "2021-02-21",
    "code": "SNOMEDCT#736719000 Repair of left inguinal hernia (procedure)",
};
console.log(a);
fs.writeFileSync('procedure.yml',yaml.dump(a));