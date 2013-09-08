anti-db
=======

Anti-db takes the idea of a database fronted by a memory cache and reverses it, for maximum performance.  The storage is a POJO (plain old JS object), which is saved to disk upon program exit.  Optionally, the data can be saved to disk periodically.

Initializing an object from disk

###_require('objname.json')   
````
require('anti-db')();
var myobj = _require('myobject.json');
 ==> {}

myobj.hey = 'there';
// no need to call save(), automatically saved to disk on exit ./myobject.json
````

### Use array instead of object
````
var myarr = _require('myobject.json', []);
 ==> []
myarr.push(1);
````

### Save obj to disk periodically, just in case
````
var myobj = _require('myobj.json', null, 10000);  // every 10 sec.
````

### Periodical mode 
Will not attempt any saving to disk on SIGINT EXIT etc.., and just save to disk periodically.    

````
require('anti-db')(1); // periodical mode
var myobj = _require('myobj.json', null, 60000);  // save to disk every 1 minute
````

### Windows systems
A workaorund (using readline/STDIN) is used so the Windows platform will correctly
handle a SIGINT (Ctrl-C) and save the data before programe exit.  As a result, programs that don't run continuous like a web server, should call process.exit explicity to end
the program.

````
require('./anti-db.js')();

var a = _require('a.json');
var b = _require('b.json');
var c = _require('c.json', []);

a.date = new Date();
b.date = new Date();
c.push(new Date());

process.exit(0);
````