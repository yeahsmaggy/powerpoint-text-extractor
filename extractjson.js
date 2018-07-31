const pptComposer = require('pptx-compose');
let composer = new pptComposer(); //instantiate
composer.parse('./digital.pptx', function (err, json) {
  console.log(JSON.stringify(json, null, 2));
});