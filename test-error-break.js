
var fs = require('fs');
fs.unlink('a.json'); fs.unlink('b.json'); fs.unlink('c.json');

var antidb = require('./anti-db.js')();

var a = antidb.obj('a.json');
var b = antidb.obj('b.json', {name: 'Chris', age: 21});
var c = antidb.obj('c.json', []);

a.date = new Date();
c.push(new Date());

require('http').createServer(function(r, s){
}).listen(8080);

// throw an error
setTimeout(function(){ throw 'error' }, 2000)

// check your disk for a-c.json, make sure they were written