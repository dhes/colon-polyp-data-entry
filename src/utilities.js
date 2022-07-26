// ...this one doesn't seem to work...
// const groupBy = (list, key) => {
//     return list.reduce((prev, curr) => {
//         return {
//             ...prev,
//             [curr[key]]: [
//                 ...(prev[key] || []),
//                 curr, 
//             ]
//         }    
//     }, {})
// }

// from https://sebhastian.com/javascript-group-by/
// ...that's more like it///
function groupBy(arr, criteria) {
    const newObj = arr.reduce(function (acc, currentValue) {
      if (!acc[currentValue[criteria]]) {
        acc[currentValue[criteria]] = [];
      }
      acc[currentValue[criteria]].push(currentValue);
      return acc;
    }, {});
    return newObj;
  }

exports.groupBy = groupBy;