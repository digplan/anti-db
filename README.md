anti-db
=======

Most simple applications, you don't need a database.  You need an in-memory object that automatically saves itself to disk.    
````
require('anti-db')();

var myobj = _require('myobject.json');
 ==> {}
myobj.hey = 'there';

// no need to call save(), automatically saved to disk on exit ./myobject.json
// automatically loaded in next time

// options - return array instead of object
var myarr = _require('myobject.json', []);
 ==> []
myarr.push(1);

var myobj = _require('myobj.json', null, 10000);
// save to disk every 10 sec. just in case..

// Preiodical mode will not attempt any saving to disk on SIGINT EXIT etc.., and just save to disk periodically.    
// Use this if you're having trouble with uncaught errors in your app not showing the error to console.log.

require('anti-db')(1);
var myobj = _require('myobj.json', null, 60000);  // save to disk every 1 minute

````