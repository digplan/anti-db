
require('./anti-db.js')();

var a = _require('a.json');
var b = _require('b.json');
var c = _require('c.json', []);

a.date = new Date();
b.date = new Date();
c.push(new Date());

// simulate a running server
setTimeout(function(){}, 60000);

// throw an error
setTimeout(function(){ throw 'error' }, 2000)

// check your disk for a-c.json, make sure they were written