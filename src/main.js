const yaml = require("js-yaml");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const report = yaml.load(fs.readFileSync("src/report_template.yml", "utf8"));
const colonoscopyProcedureIndex = 0;
const colonoscopicPolypectomyProcedureIndex = 1;
const diagnosticReportIndex = 2;
const specimenTemplate = yaml.load(
  fs.readFileSync("src/specimenTemplate.yml", "utf8")
);
const specimenObservationTemplate = yaml.load(
  fs.readFileSync("src/specimenObservationTemplate.yml", "utf8")
);
const colonoscopyProcedureId = uuidv4();
const diagnosticReportId = uuidv4();
report[colonoscopyProcedureIndex].id = colonoscopyProcedureId;
report[colonoscopicPolypectomyProcedureIndex].partOf[0].reference =
  "Procedure/" + colonoscopyProcedureId;
report[diagnosticReportIndex].id = diagnosticReportId;
report[colonoscopicPolypectomyProcedureIndex].report[0].reference =
  "DiagnosticReport/" + diagnosticReportId;
function addSpecimen () {
  const specimen = { ...specimenTemplate };
  //   const specimen = structuredClone(specimenTemplate);
  const specimenId = uuidv4();
  specimen.id = specimenId;
  const specimenObservation = { ...specimenObservationTemplate };
  //   const specimenObservation = structuredClone(specimenObservationTemplate };
  const specimenObservationId = uuidv4();
  specimenObservation.id = specimenObservationId;
  specimenObservation.specimen.push({
    reference: "Specimen/" + specimenId,
    display: null,
  });
  report.push(specimen);
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
addSpecimen();
addSpecimen();
fs.writeFileSync("oneMoreSpecimen.yml", yaml.dump(report, { noRefs: true }));
