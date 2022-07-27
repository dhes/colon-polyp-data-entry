
// from https://sebhastian.com/javascript-group-by/

// This one seems functionally identical to the second option
function groupBy(arr, criteria) {
    const newObj = arr.reduce(function (acc, currentValue) {
      if (!acc[currentValue[criteria]]) {
        acc[currentValue[criteria]] = [];
      }
      currentValueCriteria = currentValue[criteria];
      delete currentValue[criteria];  // DH added this line to prevent criteria key/value from showing up in the result
      delete currentValue['meta'];
      delete currentValue['extension'];
      acc[currentValueCriteria].push(currentValue);
      // acc[currentValue[criteria]].push(currentValue);
      return acc;
    }, {});
    return newObj;
  }

// const groupBy = function (xs, key) {
//   return xs.reduce(function (rv, x) {
//     (rv[x[key]] = rv[x[key]] || []).push(x);
//     return rv;
//   }, {});
// };

exports.groupBy = groupBy;