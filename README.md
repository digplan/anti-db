anti-db
=======

Most simple applications, you don't need a database.  You need an in-memory object that automatically saves itself to disk.    
````
require('anti-db');

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

// Note, on Windows platform, an app that uses this will have to be ended with a Ctrl-C

````
