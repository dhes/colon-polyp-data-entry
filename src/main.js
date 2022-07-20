const yaml = require('js-yaml');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const doc = yaml.load(fs.readFileSync('src/report_template.yml','utf8'));
const colonoscopyProcedureIndex = 0;
const colonoscopicPolypectomyProcedureIndex = 1;
const diagnosticReportIndex = 2;
const specimen0Index = 3;
const specimenObservationIndex = 4;

// const specimenTemplate = {...doc.data[specimen0Index]};
// fs.writeFileSync('specimenTemplate.yml', yaml.dump(doc.data[specimen0Index]));
const specimenTemplate = yaml.load(fs.readFileSync('specimenTemplate.yml','utf8'))

// const specimenObservationTemplate = {...doc.data[specimenObservationIndex]};
// fs.writeFileSync('specimenObservationTemplate.yml', yaml.dump(doc.data[specimenObservationIndex]));
const specimenObservationTemplate = yaml.load(fs.readFileSync('specimenObservationTemplate.yml','utf8'))

// const diagnosticReportSpecimenTemplate = {...doc.data[diagnosticReportIndex].specimen[0]};
// fs.writeFileSync('diagnosticReportSpecimenTemplate.yml', yaml.dump(doc.data[diagnosticReportIndex].specimen[0]));
const diagnosticReportSpecimenTemplate = yaml.load(fs.readFileSync('diagnosticReportSpecimenTemplate.yml','utf8'))

// const diagnosticReportResultTemplate = {...doc.data[diagnosticReportIndex].result[0]};
// fs.writeFileSync('diagnosticReportResultTemplate.yml', yaml.dump(doc.data[diagnosticReportIndex].result[0]));
const diagnosticReportResultTemplate = yaml.load(fs.readFileSync('diagnosticReportResultTemplate.yml','utf8'))

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
doc.data[specimenObservationIndex].id = observationId;
doc.data[specimenObservationIndex].specimen[0].reference = 'Specimen/' + specimen0Id;
doc.data[diagnosticReportIndex].result[0].reference   = 'Observation/' + observationId;
fs.writeFileSync('id.yml', yaml.dump(doc.data));
// for each additional specimen pop a Specimen then and Observation to the end of the array and assign ids
// ... then pop a specimen reference and result reference to DiagnosticReport
// and tie them back to the new Speciment and Observation ids. 
const nextSpecimen = specimenTemplate
const nextSpecimenId =  uuidv4();
nextSpecimen.id = nextSpecimenId;
// console.log(nextSpecimen);
const nextDiagnosticReportSpecimen = diagnosticReportSpecimenTemplate;
nextDiagnosticReportSpecimen.reference = 'Specimen/' + nextSpecimenId;
// console.log(nextDiagnosticReportSpecimen);
const nextSpecimenObservation = specimenObservationTemplate;
const nextSpecimenObservationId = uuidv4();
nextSpecimenObservation.id = nextSpecimenObservationId;
// const nextDiagnosticReportResult = diagnosticReportResultTemplate;
// nextDiagnosticReportResult.reference = 'Observation' + nextSpecimenObservationId;
// console.log(nextSpecimenObservation);
// console.log(nextDiagnosticReportResult);
doc.data.push(nextSpecimen);
// console.log(doc.data[doc.data.length-1]);
// console.log(doc.data);
doc.data.push(nextSpecimenObservation);
// doc.data[diagnosticReportIndex].specimen.push(nextDiagnosticReportSpecimen);
// doc.data[diagnosticReportIndex].result.push(nextDiagnosticReportResult);
fs.writeFileSync('oneMoreSpecimen.yml', yaml.dump(doc.data, {noRefs: true}));