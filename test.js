
require('./anti-db.js')(debug = 1);

var parent = {}
  , letters = ['a','b','c','d','e','f','g','h']
  , current;

while(current = letters.shift()){
	parent[current] = _require(current + '.json')
	parent[current].when = new Date();
}

console.log(parent);
// check your disk for a-h.json

// set up a running server, to make sure throw errors are printing to console
require('quick-server')({port: 2222}, function(options, app){
	throw Error('I printed to console OK');
})