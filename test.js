
var fs = require('fs');
try{
	fs.unlinkSync('a.json'); 
	fs.unlinkSync('b.json'); 
	fs.unlinkSync('c.json'); 
	fs.unlinkSync('d.json'); 
	fs.unlinkSync('e.json');
} catch(e){}

var antidb = require('./anti-db.js')(1000);

var a = antidb.obj('a.json');
var b = antidb.obj('b.json', {name: 'Chris', age: 21});
var c = antidb.obj('c.json', []);

a.date = new Date();
c.push(new Date());

// check your disk for a-c.json

// set up a running server, to check SIGINT and
// make sure thrown errors are printing to console

// CTRL-C to break this
require('http').createServer(function(r, s){
}).listen(8080);
