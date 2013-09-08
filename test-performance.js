
require('./anti-db.js')();

var a = _require('a.json');
a.date = new Date();

var t1 = new Date().getTime();
var x = 1000000;
while(x--){
	var d = a.date;
}

var t2 = new Date().getTime() - t1;
console.log(t2, 'ms (1M lookups)');