const yaml = require('js-yaml');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const report = yaml.load(fs.readFileSync('src/templates/report_template.yml', 'utf8'));
const specimen_template = yaml.load(fs.readFileSync('src/templates/specimen_template.yml', 'utf8'));
const specimen_observation_template = yaml.load(fs.readFileSync('src/templates/specimen_observation_template.yml', 'utf8'));
const info = yaml.load(fs.readFileSync('src/data/2011_polyps.yml', 'utf8'));
const shorthand = yaml.load(fs.readFileSync('src/templates/shorthand.yml', {encoding: 'utf8'}));
const polyps = info.polyps;
const collectionDate = info.collectionDate;
// const reportDate = info.reportDate;
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
  const specimenResource = structuredClone(specimen_template);
  const specimenId = uuidv4();
  specimenResource.id = specimenId;
  specimenResource.collection.collectedDateTime = collectionDate;
  specimenResource.collection.bodySite = shorthand.bodySites[polyp.bodySite];
  specimenResource.collection.quantity = polyp.length;
  specimenResource.note.text = polyp.note;
  const specimenObservation = structuredClone(specimen_observation_template);
  const specimenObservationId = uuidv4();
  specimenObservation.id = specimenObservationId;
  specimenObservation.specimen.push({
    reference: "Specimen/" + specimenId,
    display: polyp.note,
  });
  if (polyp.pathology) { 
    specimenObservation.hasMember.push(
      shorthand.pathology[polyp.pathology]
    )
  }; 
  // specimenObservation.hasMember.push(polypSize); (pseudocode)
  specimenObservation.hasMember.push(shorthand.piecemealExcision[polyp.piecemealExcision]);
  specimenObservation.hasMember.push(shorthand.severeDysplasia[polyp.severeDysplasia]);
  specimenObservation.hasMember.push(shorthand.noEvidenceOfMalignantNeoplasm[polyp.noEvidenceOfMalignantNeoplasm]);
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
// just this generated polyp report:
fs.writeFileSync('oneReport.yml', yaml.dump(report, { noRefs: true }));
