const yaml = require('js-yaml');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const report = yaml.load(fs.readFileSync('src/report_template.yml', 'utf8'));
const specimenTemplate = yaml.load(fs.readFileSync('src/specimenTemplate.yml', 'utf8'));
const specimenObservationTemplate = yaml.load(fs.readFileSync('src/specimenObservationTemplate.yml', 'utf8'));
const info = yaml.load(fs.readFileSync('src/polyps.yml', 'utf8'));
const shortHand = yaml.load(fs.readFileSync('src/shortHand.yml', 'utf8'));
const polyps = info.polyps;
const collectionDate = info.collectionDate;
const reportDate = info.reportDate;
const colonoscopyProcedureIndex = 0;
const colonoscopicPolypectomyProcedureIndex = 1;
const diagnosticReportIndex = 2;
report[colonoscopyProcedureIndex].performedDateTime = info.collectionDate
report[colonoscopicPolypectomyProcedureIndex].performedDateTime = info.collectionDate
report[diagnosticReportIndex].effectiveDateTime = info.collectionDate;
report[diagnosticReportIndex].issued = info.reportDate;
const colonoscopyProcedureId = uuidv4();
const diagnosticReportId = uuidv4();
report[colonoscopyProcedureIndex].id = colonoscopyProcedureId;
report[colonoscopicPolypectomyProcedureIndex].partOf[0].reference =
  "Procedure/" + colonoscopyProcedureId;
report[diagnosticReportIndex].id = diagnosticReportId;
report[colonoscopicPolypectomyProcedureIndex].report[0].reference =
  "DiagnosticReport/" + diagnosticReportId;
polyps.forEach(addSpecimen)
function addSpecimen(polyp) {
  const specimenResource = structuredClone(specimenTemplate);
  const specimenId = uuidv4();
  specimenResource.id = specimenId;
  specimenResource.collection.collectedDateTime = collectionDate;
  specimenResource.collection.bodySite = shortHand.bodySites[polyp.bodySite];
  specimenResource.collection.quantity = polyp.length;
  specimenResource.note.text = polyp.note;
  const specimenObservation = structuredClone(specimenObservationTemplate);
  const specimenObservationId = uuidv4();
  specimenObservation.id = specimenObservationId;
  specimenObservation.specimen.push({
    reference: "Specimen/" + specimenId,
    display: polyp.note,
  });
  if (polyp.pathology) { 
    specimenObservation.hasMember.push(
      shortHand.pathology[polyp.pathology]
    )
  };
  specimenObservation.hasMember.push(shortHand.piecemealExcision[polyp.piecemealExcision]);
  specimenObservation.hasMember.push(shortHand.severeDysplasia[polyp.severeDysplasia]);
  specimenObservation.hasMember.push(shortHand.noEvidenceOfMalignantNeoplasm[polyp.noEvidenceOfMalignantNeoplasm]);
  report.push(specimenResource);
  report.push(specimenObservation);
  report[diagnosticReportIndex].specimen.push({
    reference: "Specimen/" + specimenId,
    display: polyp.note,
  });
  report[diagnosticReportIndex].result.push({
    reference: "Observation/" + specimenObservationId,
    display: polyp.note,
  });
}
fs.writeFileSync('oneMoreSpecimen.yml', yaml.dump(report, { noRefs: true }));
