// reformat a yml test file to make it a little more human readable
const yaml = require("js-yaml");
const fs = require("fs");
const { groupBy } = require("./utilities");
const testFile = yaml.load(fs.readFileSync("Medicare_Male.yml", "utf8"));
console.log(testFile);
// try the groupBy function:
const groupedResources = groupBy(testFile, "resourceType");
console.log(groupedResources);
let Conditions = testFile.filter(
  (resource) => resource.resourceType == "Condition"
);
let Problems = structuredClone(Conditions);
for (const r of Conditions) {
  delete r.resourceType;
  const indexOfHash = (r['code']).indexOf('#');
  const indexOfSpace = (r['code']).indexOf(' ');
  r['name'] = r['code'].substring(indexOfSpace + 1);
  r['code'] = r['code'].substring(0, indexOfHash) + " " + r['code'].substring(indexOfHash + 1, indexOfSpace);
  r['onset'] =  r['onsetDateTime'];
  delete r['onsetDateTime'];
  r['onset'] = (r['onset']).substring(0,10);
}
Conditions = {Conditions};
fs.writeFileSync("compactSummary.yml", yaml.dump(Conditions, { noRefs: true}));
// or...
let condition = "Conditions:\n  ";
for (const r of Problems) {
    const indexOfHash = (r['code']).indexOf('#');
    const indexOfSpace = (r['code']).indexOf(' ');
    // r['name'] = r['code'].substring(indexOfSpace + 1);
    const name = r['code'].substring(indexOfSpace + 1);
    // const codeSystem = ;
    const code = r['code'].substring(0, indexOfHash) + " " + r['code'].substring(indexOfHash + 1, indexOfSpace)
    condition += "- " + name + " (" + code + ")\n  ";
}
console.log(condition);
// let patientSummary = "Summary: \n" + condition
// fs.writeFileSync("condition.yml", yaml.dump(patientSummary, { noRefs: true}));
fs.writeFileSync("condition.yml", condition);
