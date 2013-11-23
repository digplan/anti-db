anti-db
=======

Anti-db takes the idea of a database fronted by a memory cache and reverses it, for maximum performance.  The storage is a POJO (plain old JS object), which is saved to disk upon program exit.  Optionally, the data can be saved to disk periodically.

###Initializing an object from disk
````
var antidb = require('anti-db')();
var myobj = antidb.obj('./some.json');
myobj.hey = 'there';
// no need to call save(), automatically saved to disk on exit ./some.json
````

### Use array instead of object
````
var myarr = antidb.obj('./somearr.json', []);
myarr.push(1970);
````

### Save obj to disk periodically, just to be safer
````
var antidb = require('anti-db')(10000);  // every 10 sec.
var myobj = antidb.obj('./some.json');
myobj.hey = 'there';
````

### Periodical mode 
Will not attempt any saving to disk on SIGINT EXIT etc.., and just save to disk periodically.    
````
var antidb = require('anti-db')(period = 10000, nosaveonexit = 1});  // every 10 sec.
var myobj = antidb.obj('./some.json');
myobj.hey = 'there';
````

### Provide a default object / model and seal the object from further property additions
````
var antidb = require('anti-db')();
var myobj = antidb.obj('./some.json', {name: 'Chris', age: 21});
````

### Override loading and saving of objects - Use as cache for other data sources
````
// Using a CSV as backing file

var antidb = require('anti-db')();
antidb.loadFunc = function(name, type){
	var csv_arr = fs.readFileSync(name).toString().split(/\n/);
	// put into JSON object
	return obj;
}
antidb.saveFunc = function(name, o){
	require('json2csv')({data: json, fields: ['car', 'price', 'color']}, function(err, csv) {
	  if (err) console.log(err);
	  fs.writeFile('file.csv', csv, function(err) {
	    if (err) throw err;
	    console.log('file saved');
	  });
	});
}
````

### Debug mode
Do this when running your app..
````
$ debug=1 node myapp
````