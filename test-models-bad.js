
require('./anti-db.js')();

var a = _require('test-models-bad.json', {name:'Chris'});
a.name = 'Chris';
a.age = 21;

// should throw error