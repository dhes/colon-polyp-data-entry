const yaml = require('js-yaml');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const doc = yaml.load(fs.readFileSync('src/report_template.yml','utf8'));
const colonoscopyProcedureIndex = 0;
const colonoscopicPolypectomyProcedureIndex = 1;
const diagnosticReportIndex = 2;
const specimenIndex = 3;
const observationIndex = 4;
// const polypectomyProcedureIndex = doc.data.findIndex(c => c.code.slice(0,18)==="SNOMEDCT#311774002");
colonoscopyProcedureId = uuidv4();
diagnosticReportId = uuidv4();
specimenId = uuidv4();
observationId = uuidv4();
// console.log(doc.data[polypectomyProcedureIndex].id);
// console.log(doc.data[polypectomyProcedureIndex]);
doc.data[colonoscopyProcedureIndex].id = colonoscopyProcedureId;
doc.data[colonoscopicPolypectomyProcedureIndex].partOf[0].reference = 'Procedure/' + colonoscopyProcedureId;
doc.data[diagnosticReportIndex].id = diagnosticReportId;
doc.data[colonoscopicPolypectomyProcedureIndex].report[0].reference = 'DiagnosticReport/' + diagnosticReportId;
doc.data[specimenIndex].id = specimenId
doc.data[diagnosticReportIndex].specimen[0].reference = 'Specimen/' + specimenId
doc.data[observationIndex].id = observationId
doc.data[diagnosticReportIndex].result[0].reference   = 'Observation/' + observationId;
console.log(doc.data[colonoscopyProcedureIndex].id);
console.log(doc.data[colonoscopicPolypectomyProcedureIndex].partOf[0].reference);
console.log(doc.data[diagnosticReportIndex].id);
console.log(doc.data[colonoscopicPolypectomyProcedureIndex].report[0].reference);
console.log(doc.data[specimenIndex].id);
console.log(doc.data[diagnosticReportIndex].specimen[0].reference);
console.log(doc.data[observationIndex].id);
console.log(doc.data[diagnosticReportIndex].result[0].reference);

