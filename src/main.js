const yaml = require('js-yaml');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const report = yaml.load(fs.readFileSync('src/report_template.yml','utf8'));
const colonoscopyProcedureIndex = 0;
const colonoscopicPolypectomyProcedureIndex = 1;
const diagnosticReportIndex = 2;
// const specimen0Index = 3;
// const specimenObservationIndex = 4;
// console.log(report[diagnosticReportIndex].specimen)
const specimenTemplate = yaml.load(fs.readFileSync('src/specimenTemplate.yml','utf8'))
const specimenObservationTemplate = yaml.load(fs.readFileSync('src/specimenObservationTemplate.yml','utf8'))
// const diagnosticReportSpecimenTemplate = yaml.load(fs.readFileSync('diagnosticReportSpecimenTemplate.yml','utf8'))
// const diagnosticReportResultTemplate = yaml.load(fs.readFileSync('diagnosticReportResultTemplate.yml','utf8'))
const colonoscopyProcedureId = uuidv4();
const diagnosticReportId = uuidv4();
// const specimen0Id = uuidv4();
// const observationId = uuidv4();
// assign ids
report[colonoscopyProcedureIndex].id = colonoscopyProcedureId;
report[colonoscopicPolypectomyProcedureIndex].partOf[0].reference = 'Procedure/' + colonoscopyProcedureId;
report[diagnosticReportIndex].id = diagnosticReportId;
report[colonoscopicPolypectomyProcedureIndex].report[0].reference = 'DiagnosticReport/' + diagnosticReportId;
// report[specimen0Index].id = specimen0Id;
// report[diagnosticReportIndex].specimen[0].reference = 'Specimen/' + specimen0Id;
// report[specimenObservationIndex].id = observationId;
// report[specimenObservationIndex].specimen[0].reference = 'Specimen/' + specimen0Id;
// report[diagnosticReportIndex].result[0].reference   = 'Observation/' + observationId;
// for each additional specimen pop a Specimen then and Observation to the end of the array and assign ids
// ... then pop a specimen reference and result reference to DiagnosticReport
// and tie them back to the new Speciment and Observation ids. 
const nextSpecimen = specimenTemplate
const nextSpecimenId =  uuidv4();
nextSpecimen.id = nextSpecimenId;
// const nextDiagnosticReportSpecimen = diagnosticReportSpecimenTemplate;
// nextDiagnosticReportSpecimen.reference = 'Specimen/' + nextSpecimenId;
const nextSpecimenObservation = specimenObservationTemplate;
const nextSpecimenObservationId = uuidv4();
nextSpecimenObservation.id = nextSpecimenObservationId;
// const nextDiagnosticReportResult = diagnosticReportResultTemplate;
// nextDiagnosticReportResult.reference = 'Observation' + nextSpecimenObservationId;
report.push(nextSpecimen);
report.push(nextSpecimenObservation);
//  push new specimen reference to diagnosticReport.specimen
report[diagnosticReportIndex].specimen.push({reference: 'Specimen/' + nextSpecimenId, display: null })
//  push new specimen observation reference to diagnosticReport.result
report[diagnosticReportIndex].result.push({reference: 'Observation/' + nextSpecimenObservationId, display: null })
// push specimen reference to corresponding result Observation
report[report.length - 1].specimen.push({ reference: 'Specimen/' + nextSpecimenId, display: null});
// let's take a look: 
fs.writeFileSync('oneMoreSpecimen.yml', yaml.dump(report, { noRefs: true }));