
require('./anti-db.js')(debug = 1);

var parent = {}
  , letters = ['a','b','c','d','e','f','g','h']
  , current;

while(current = letters.shift()){
	parent[current] = _require(current + '.json')
	parent[current].when = new Date();
}

console.log(parent);
// check your disk for a.json

// uncomment this and Ctrl-C to make sure files are written
// setTimeout(console.log, 1000000);
