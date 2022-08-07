// const yaml = require('js-yaml');
const fs = require('fs');
const bundle = JSON.parse(fs.readFileSync('/Users/danheslinga/Dropbox/Health/Heslinga-Dan/some-guy.json', 'utf8'));
// console.log(withoutFullUrls);
for ( const e of bundle.entry ) {
  const resourceType = e.resource.resourceType;
  const resourceId = e.resource.id;
  const fullUrl = resourceType + '/' + resourceId;
  e.fullUrl = fullUrl;
//   console.log (fullUrl);
}
fs.writeFileSync('/Users/danheslinga/Dropbox/Health/Heslinga-Dan/some-guy-with_fullurl.json', JSON.stringify( bundle ), 'utf8');