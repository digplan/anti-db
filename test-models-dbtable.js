
require('./anti-db.js')();

var table = _require('test-models-dbtable.json', []);

var record1 = _require({name: ''});
record1.name = 'Chris';
table.push(record1);

var record2 = _require({name: ''});
record2.name = 'Billw';
table.push(record2);

record2.age = 50;
