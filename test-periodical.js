
require('./anti-db.js')(1);

var d = _require('d.json', null, 3000);
d.date = new Date();

var e = _require('e.json', [], 1000);
e.push(new Date());

var rfs = require('fs').readFileSync;
setTimeout(function(){
	console.log(rfs('d.json').toString());
	console.log(rfs('e.json').toString());
}, 5000)