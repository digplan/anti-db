
require('./anti-db.js')();

var a = _require('a.json');
var b = _require('b.json');
var c = _require('c.json', []);

a.date = new Date();
b.date = new Date();
c.push(new Date());

// check your disk for a-c.json

// set up a running server, to check SIGINT and
// make sure thrown errors are printing to console

// CTRL-C to break this
require('http').createServer(function(r, s){

}).listen(8080);