
// try a simple program
// on Windows systems, a workaround is done to simulate
// correct handling of the SIG-INT signal.  So, you will have
// to explicity call process.exit.  This is not normally an issue
// with server type programs and services that run continuous.

require('./anti-db.js')();

var a = _require('a.json');
var b = _require('b.json');
var c = _require('c.json', []);

a.date = new Date();
b.date = new Date();
c.push(new Date());

process.exit(0);