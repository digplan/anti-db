
var fs = require('fs');
try{
	fs.unlinkSync('a.json'); 
	fs.unlinkSync('b.json'); 
	fs.unlinkSync('c.json'); 
	fs.unlinkSync('d.json'); 
	fs.unlinkSync('e.json');
} catch(e){}

var antidb = require('./anti-db.js')();

var a = antidb.obj('a.json');
a.date = new Date();

var t1 = new Date().getTime();
var x = 1000000;
while(x--){
	var d = a.date;
}

var t2 = new Date().getTime() - t1;
console.log(t2, 'ms (1M lookups)');