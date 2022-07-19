const yaml = require('js-yaml');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const doc = yaml.load(fs.readFileSync('src/report_template.yml','utf8'));
const colonoscopyProcedureIndex = 0;
const colonoscopicPolypectomyProcedureIndex = 1;
const diagnosticReportIndex = 2;
const specimen0Index = 3;
const observationIndex = 4;
colonoscopyProcedureId = uuidv4();
diagnosticReportId = uuidv4();
specimen0Id = uuidv4();
observationId = uuidv4();
// assign ids
doc.data[colonoscopyProcedureIndex].id = colonoscopyProcedureId;
doc.data[colonoscopicPolypectomyProcedureIndex].partOf[0].reference = 'Procedure/' + colonoscopyProcedureId;
doc.data[diagnosticReportIndex].id = diagnosticReportId;
doc.data[colonoscopicPolypectomyProcedureIndex].report[0].reference = 'DiagnosticReport/' + diagnosticReportId;
doc.data[specimen0Index].id = specimen0Id;
doc.data[diagnosticReportIndex].specimen[0].reference = 'Specimen/' + specimen0Id;
doc.data[observationIndex].id = observationId;
doc.data[observationIndex].specimen[0].reference = 'Specimen/' + specimen0Id;
doc.data[diagnosticReportIndex].result[0].reference   = 'Observation/' + observationId;
fs.writeFileSync('id.yml', yaml.dump(doc.data));
// for each additional specimen pop a Specimen then and Observation to the end of the array and assign ids
// ... then pop a specimen reference and result reference to DiagnosticReport
// and tie them back to the new Speciment and OBservation ids. 