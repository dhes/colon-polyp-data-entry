const yaml = require('js-yaml');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const report = yaml.load(fs.readFileSync('src/report_template.yml', 'utf8'));
const colonoscopyProcedureIndex = 0;
const colonoscopicPolypectomyProcedureIndex = 1;
const diagnosticReportIndex = 2;
const specimenTemplate = yaml.load(
  fs.readFileSync('src/specimenTemplate.yml', 'utf8')
);
const specimenObservationTemplate = yaml.load(
  fs.readFileSync('src/specimenObservationTemplate.yml', 'utf8')
);
const colonoscopyProcedureId = uuidv4();
const diagnosticReportId = uuidv4();
report[colonoscopyProcedureIndex].id = colonoscopyProcedureId;
report[colonoscopicPolypectomyProcedureIndex].partOf[0].reference =
  "Procedure/" + colonoscopyProcedureId;
report[diagnosticReportIndex].id = diagnosticReportId;
report[colonoscopicPolypectomyProcedureIndex].report[0].reference =
  "DiagnosticReport/" + diagnosticReportId;
const polyps = yaml.load(fs.readFileSync('src/polyps.yml', 'utf8'));
const shortHand = yaml.load(fs.readFileSync('src/shortHand.yml', 'utf8'));
// console.log(shortHand.bodySites['cecum']);
polyps.forEach(addSpecimen)
function addSpecimen(polyp) {
  // console.log(polyp);
  const specimenResource = structuredClone(specimenTemplate);
  const specimenId = uuidv4();
  specimenResource.id = specimenId;
  // add from polyp.bodySite
  specimenResource.collection.bodySite = shortHand.bodySites[polyp.bodySite];
  specimenResource.collection.quantity = polyp.length;
  const specimenObservation = structuredClone(specimenObservationTemplate);
  const specimenObservationId = uuidv4();
  specimenObservation.id = specimenObservationId;
  specimenObservation.specimen.push({
    reference: "Specimen/" + specimenId,
    display: null,
  });
  if(polyp.pathology) { // or mayge you should just let it error out
  specimenObservation.hasMember.push(
    shortHand.pathology[polyp.pathology]
  )};
  specimenObservation.hasMember.push(shortHand.piecemealExcision[polyp.piecemealExcision]);
  specimenObservation.hasMember.push(shortHand.severeDysplasia[polyp.severeDysplasia]);
  specimenObservation.hasMember.push(shortHand.noEvidenceOfMalignantNeoplasm[polyp.noEvidenceOfMalignantNeoplasm]);
  report.push(specimenResource);
  report.push(specimenObservation);
  report[diagnosticReportIndex].specimen.push({
    reference: "Specimen/" + specimenId,
    display: null,
  });
  //  push new specimen observation reference to diagnosticReport.result
  report[diagnosticReportIndex].result.push({
    reference: "Observation/" + specimenObservationId,
    display: null,
  });
}
fs.writeFileSync('oneMoreSpecimen.yml', yaml.dump(report, { noRefs: true }));
