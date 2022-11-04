
// group together FHIR resources in an attempt to ...
// make a patient summary more readable
// from https://sebhastian.com/javascript-group-by/

function groupBy(arr, criteria) {
    const newObj = arr.reduce(function (acc, currentValue) {
      if (!acc[currentValue[criteria]]) {
        acc[currentValue[criteria]] = [];
      }
      currentValueCriteria = currentValue[criteria];
      delete currentValue[criteria];  // DH added this line to prevent criteria key/value from showing up in the result
      delete currentValue['meta']; // metas and extensions don't matter in a human-read summary
      delete currentValue['extension'];
      acc[currentValueCriteria].push(currentValue);
      // acc[currentValue[criteria]].push(currentValue);
      return acc;
    }, {});
    return newObj;
  }

exports.groupBy = groupBy;