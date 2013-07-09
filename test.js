require('./anti-db.js');

var someobj = _require('a.json');
someobj.tests = 'NOW';

console.log(someobj);

setTimeout(console.log, 1000000);

// check your disk for a.json
