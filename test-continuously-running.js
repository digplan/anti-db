
require('./anti-db.js')();

var a = _require('a.json');
var b = _require('b.json');
var c = _require('c.json', []);

a.date = new Date();
b.date = new Date();
c.push(new Date());

// simulate a running server, CTRL-C to break this
// then check your disk for a-c.json, make sure they were written
setTimeout(function(){}, 60000);
console.log('CTRL-C to break this');
